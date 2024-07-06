"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import clsx from "clsx";
import { Noto_Sans_JP } from "next/font/google";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import "../styles/globals.css";
import styles from "../styles/home.module.css";
import editoutline from "../lib/eva-icons/outline/svg/edit-outline.svg";
import refreshoutline from "../lib/eva-icons/outline/svg/refresh-outline.svg";
import gearoutline from "../lib/eva-icons/outline/svg/settings-2-outline.svg";
import plusoutline from "../lib/eva-icons/outline/svg/plus-outline.svg";
import { Badge } from "@/components/ui/badge";
import Ajv from "ajv";
import DOMPurify from "dompurify";
import Head from "next/head";

const ajv = new Ajv(); //Validation library

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" }); // Load Noto Sans JP font

type Product = {
  //retrieved from API
  imageURL: string;
  productBrand: string;
  productCategory: number;
  productId: number;
  productName: string;
  productPrice: number;
  shopImageURL: string;
  shopName: string;
  shopURL: string;
};

type Tab = {
  id: number;
  name: string;
  term: string;
  products: Product[];
  seenItems: Set<number>;
  newItems: Product[];
};

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([]); // Stores the list of tabs
  const [activeTabId, setActiveTabId] = useState<number | null>(null); // ID of the active tab
  const [error, setError] = useState<string | null>(null); // Error message, if any
  const [newTabTerm, setNewTabTerm] = useState<string>(""); // Term for creating a new tab
  const [alteringName, setAlteringName] = useState<number | null>(null); // ID of the tab being renamed
  const [isComposing, setIsComposing] = useState(false); // Whether the user is composing text
  const [loading, setLoading] = useState(false); // Indicates if data is being loaded during API fetch
  const [sidebarOpen, setSidebarOpen] = useState(false); // Whether the sidebar is open
  const [language, setLanguage] = useState("JP"); // Current app language
  const tabSchema = {
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      term: { type: "string" },
    },
    required: ["id", "name", "term"],
    additionalProperties: false,
  };

  useEffect(() => {
    // Retrieve saved tabs from localStorage on component mount
    const savedTabs = localStorage.getItem("tabs");
    if (savedTabs) {
      try {
        const parsedTabs: Tab[] = JSON.parse(savedTabs).map((tab: any) => ({
          ...tab,
          seenItems: new Set(tab.seenItems), // Convert seenItems array back to a Set
          hasNewItem: false, // Initialize to false on load
        }));
        setTabs(parsedTabs); // Set the parsed tabs to state
        if (parsedTabs.length > 0) {
          setActiveTabId(parsedTabs[0].id); // Set the first tab as active
        }
      } catch (err) {
        console.error("Error parsing tabs from localStorage:", err);
        setTabs([]); // Set tabs to an empty array on error
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    // Save tabs to localStorage whenever they change
    localStorage.setItem(
      "tabs",
      JSON.stringify(
        tabs.map((tab) => ({
          ...tab,
          seenItems: Array.from(tab.seenItems), // Convert Set back to array for storage
        })),
      ),
    );
  }, [tabs]); // Run this effect whenever tabs state changes

  // Handle composition start event (e.g., when starting to type in an input field)
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // Handle composition end event (e.g., when finishing typing in an input field)
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // Handle language change
  const handleLanguageChange = (selectedLanguage: string) => {
    console.log(`Updating language to ${selectedLanguage}`);
    setLanguage(selectedLanguage);
  };

  // Fetch products based on search term
  const fetchProducts = async (term: string) => {
    try {
      const response = await axios.get<{ items: Product[] }>(
        "/api/products/search",
        {
          params: { term },
        },
      );
      if (Array.isArray(response.data.items)) {
        return response.data.items;
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format");
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
      return [];
    }
  };

  // Handle search action for a specific tab
  const handleSearch = async (tab: Tab) => {
    setLoading(true); // Set loading state to true
    const products = await fetchProducts(tab.term); // Fetch products based on tab term
    const newItems: Product[] = products.filter(
      (product) => !tab.seenItems.has(product.productId),
    );

    newItems.forEach((product) => tab.seenItems.add(product.productId)); // Add new items to seenItems

    // Update tabs state with new products and items
    setTabs((prevTabs) =>
      prevTabs.map((t) =>
        t.id === tab.id
          ? {
              ...t,
              products,
              seenItems: new Set(t.seenItems),
              newItems,
            }
          : t,
      ),
    );
    setError(null); // Clear previous error
    setLoading(false); // Set loading state to false
  };

  // Set the active tab by ID and trigger search if needed
  const setActiveTab = (tabId: number) => {
    setActiveTabId(tabId);
    const tab = tabs.find((tab) => tab.id === tabId);
    if (tab && tab.products.length === 0) {
      handleSearch(tab); // Trigger search if no products are loaded
    }
    console.log("Active tab:", tabId);
  };

  // Extract ID from a given URL
  const extractIdFromUrl = (url: string): string | null => {
    // ID is given in the form of booth.pm/items/{ID}
    // This extracts the ID part from the URL
    const match = url.match(/\/items\/(\d+)/);
    return match ? match[1] : null;
  };

  // Add a new tab based on the newTabTerm input
  const addTab = () => {
    if (!newTabTerm) {
      return;
    }
    const id = extractIdFromUrl(newTabTerm);
    if (!id) {
      console.error("Invalid URL format");
      return;
    }

    const existingTab = tabs.find((tab) => tab.term === id);

    if (existingTab) {
      console.log("Tab already exists:", existingTab);
      setActiveTab(existingTab.id); // Set the tab with the same term active
      setNewTabTerm(""); // Clear input field
    } else {
      const tabCount = tabs.length;
      const defaultName = `アバター ${tabCount + 1}`;
      const newTab: Tab = {
        id: Date.now(),
        name: defaultName,
        term: id,
        products: [],
        seenItems: new Set<number>(),
        newItems: [],
      };
      setTabs((prevTabs) => [...prevTabs, newTab]);
      setActiveTab(newTab.id); // Set the new tab active
      handleSearch(newTab); // Trigger search for the new tab
      setNewTabTerm(""); // Clear input field
    }
  };

  // Handle reload action for a specific tab
  const handleReload = async (tab: Tab) => {
    await handleSearch(tab);
  };

  // Edit the name of a tab by its ID
  const handleEditTabName = (id: number, newName: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, name: newName } : tab)),
    );
    setAlteringName(null); // Reset editing state
  };

  // Handle key down event for renaming a tab
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (!isComposing && e.key === "Enter") {
      handleEditTabName(id, (e.target as HTMLInputElement).value);
    }
  };

  // Toggle the sidebar open state
  const handleToggleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Import tab data from a given string
  const handleImportData = (data: string) => {
    try {
      const parsedData = JSON.parse(decodeURIComponent(data));
      console.log(typeof parsedData);
      if (ajv.validate(tabSchema, parsedData)) {
        const importedTabs: Tab[] = parsedData.map((tab: any) => ({
          id: DOMPurify.sanitize(tab.id),
          name: DOMPurify.sanitize(tab.name),
          term: DOMPurify.sanitize(tab.term),
          products: [],
          seenItems: new Set<number>(),
          newItems: [],
        }));
        setTabs(importedTabs);
        if (importedTabs.length > 0) {
          setActiveTabId(importedTabs[0].id); // Set the first imported tab as active
        }
        handleSearch(importedTabs[0]); // Trigger search for the first imported tab
      } else {
        console.error("Invalid data format");
      }
    } catch (err) {
      alert("Invalid data format");
      console.error("Invalid data format");
    }
  };

  // Export tab data to a string
  const handleExportData = () => {
    const tabsData = tabs.map((tab) => ({
      id: tab.id,
      name: tab.name,
      term: tab.term,
    }));

    const dataStr = encodeURIComponent(JSON.stringify(tabsData));
    return dataStr;
  };

  // Reset all tab data
  const handleResetData = () => {
    setTabs([]);
    setActiveTabId(null);
  };

  return (
    <div className={clsx(styles.container, notosansjp_regular.className)}>
      <Head>
        {" "}
        <title> Avatar Wardrobe </title>{" "}
        <meta
          name="description"
          content="Track and manage your favorite avatars and their outfits with Avatar Wardrobe."
        />
      </Head>
      {sidebarOpen && (
        <Sidebar
          onImport={handleImportData}
          onExport={handleExportData}
          onDelete={handleResetData}
          onClose={handleToggleSidebarOpen}
          onLanguageChange={handleLanguageChange}
          currentLanguage={language}
        />
      )}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Avatar Wardrobe</h1>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="newTabTerm"
              placeholder={
                language === "JP"
                  ? "アバターのリンクを入力"
                  : "Enter an avatar link"
              }
              value={newTabTerm}
              onChange={(e) =>
                setNewTabTerm(DOMPurify.sanitize(e.target.value))
              }
              className={clsx(styles.input)}
            />
            <button onClick={addTab} className={styles.button}>
              <img
                src={plusoutline.src}
                alt="add"
                className={styles.plusIcon}
              />
            </button>
          </div>
          <button onClick={handleToggleSidebarOpen}>
            <img src={gearoutline.src} alt="gear" className={styles.gearIcon} />
          </button>
        </div>
        {tabs.length === 0 ? (
          <p className={clsx(styles.noTabs)}>
            {language === "JP"
              ? "新しいアバターを追加して始めましょう。"
              : "Add an avatar to get started."}
          </p>
        ) : (
          <Tabs value={activeTabId?.toString()} className={styles.tabs}>
            <TabsList className={styles.tabsList}>
              {tabs.map((tab) => (
                <div className={styles.tabHeader} key={tab.id}>
                  <TabsTrigger
                    value={tab.id.toString()}
                    onClick={() => setActiveTab(tab.id)}
                    className={styles.tabTrigger}
                  >
                    {tab.name}
                  </TabsTrigger>
                </div>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id.toString()}
                className={styles.tabsContent}
              >
                <div className={styles.tabHeader}>
                  {alteringName === tab.id ? (
                    <input
                      type="text"
                      defaultValue={tab.name}
                      onKeyDown={(e) => handleKeyDown(e, tab.id)}
                      onCompositionStart={handleCompositionStart}
                      onCompositionEnd={handleCompositionEnd}
                      className={styles.editInput}
                    />
                  ) : (
                    <h2 className={clsx(styles.tabTitle)}>{tab.name}</h2>
                  )}
                  {alteringName !== tab.id && (
                    <button
                      className={styles.editIcon}
                      onClick={() => setAlteringName(tab.id)}
                    >
                      <img src={editoutline.src} alt="Edit" />
                    </button>
                  )}
                  <button
                    className={styles.reloadIcon}
                    onClick={() => handleReload(tab)}
                  >
                    <img src={refreshoutline.src} alt="Reload" />
                  </button>
                </div>
                {loading ? (
                  <p className={styles.newItems}> Loading...</p>
                ) : (
                  <>
                    {tab.newItems.length > 0 && (
                      <p className={styles.newItems}>
                        {language === "JP"
                          ? "新しい商品が見つかりました！"
                          : "New items found!"}
                      </p>
                    )}
                    <div className={styles.grid}>
                      {tab.products.map((product) => (
                        <div
                          key={product.productId}
                          className={clsx(
                            styles.product,
                            !tab.seenItems.has(product.productId) &&
                              styles.newProduct,
                          )}
                        >
                          <button
                            onClick={() => {
                              window.open(
                                product.shopURL + "items/" + product.productId,
                                "_blank",
                              );
                            }}
                          >
                            <img
                              src={product.imageURL}
                              alt={product.productName}
                              className={styles.largeImage}
                            />
                          </button>
                          <p className={styles.productName}>
                            {product.productName}
                          </p>
                          <div
                            onClick={() => {
                              window.open(product.shopURL, "_blank");
                            }}
                            className={styles.shopInfo}
                          >
                            <img
                              src={product.shopImageURL}
                              alt={product.shopName}
                              className={styles.smallImage}
                            />
                            {product.shopName}
                          </div>
                          <div className={clsx(styles.priceText)}>
                            ¥ {product.productPrice}
                          </div>
                          {tab.newItems.some(
                            (newItem) =>
                              newItem.productId === product.productId,
                          ) && <Badge className={styles.newBadge}>New!</Badge>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}
