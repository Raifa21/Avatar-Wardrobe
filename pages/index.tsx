import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import clsx from "clsx";
import { Noto_Sans_JP } from "next/font/google";
import { useEffect, useState } from "react";
import "../app/globals.css";
import styles from "./index.module.css";
import editoutline from "../lib/eva-icons/outline/svg/edit-outline.svg";
import refreshoutline from "../lib/eva-icons/outline/svg/refresh-outline.svg";
import gearoutline from "../lib/eva-icons/outline/svg/settings-2-outline.svg";

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" });

type Product = {
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
};

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [newItems, setNewItems] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newTabName, setNewTabName] = useState<string>("");
  const [newTabTerm, setNewTabTerm] = useState<string>("");
  const [alteringName, setAlteringName] = useState<number | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTabs = localStorage.getItem("tabs");
    if (savedTabs) {
      try {
        const parsedTabs: Tab[] = JSON.parse(savedTabs).map((tab: any) => ({
          ...tab,
          seenItems: new Set(tab.seenItems),
        }));
        setTabs(parsedTabs);
        if (parsedTabs.length > 0) {
          setActiveTabId(parsedTabs[0].id);
        }
      } catch (err) {
        console.error("Error parsing tabs from localStorage:", err);
        setTabs([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tabs",
      JSON.stringify(
        tabs.map((tab) => ({
          ...tab,
          seenItems: Array.from(tab.seenItems),
        })),
      ),
    );
  }, [tabs]);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

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

  const handleSearch = async (tab: Tab) => {
    setLoading(true);
    const products = await fetchProducts(tab.term);
    const newItems: Product[] = products.filter(
      (product) => !tab.seenItems.has(product.productId),
    );

    newItems.forEach((product) => tab.seenItems.add(product.productId));

    setTabs((prevTabs) =>
      prevTabs.map((t) =>
        t.id === tab.id
          ? { ...t, products, seenItems: new Set(t.seenItems) }
          : t,
      ),
    );
    setNewItems(newItems);
    setError(null); // Clear previous error
    setLoading(false);
  };

  const setActiveTab = (tabId: number) => {
    setActiveTabId(tabId);
    console.log("Active tab:", tabId);
  };

  const addTab = () => {
    const existingTab = tabs.find((tab) => tab.term === newTabTerm);

    if (existingTab) {
      console.log("Tab already exists:", existingTab);
      setActiveTab(existingTab.id);
      setNewTabTerm("");
    } else {
      const tabCount = tabs.length;
      const defaultName = `Tab ${tabCount + 1}`;
      const newTab: Tab = {
        id: Date.now(),
        name: newTabName || defaultName,
        term: newTabTerm,
        products: [],
        seenItems: new Set<number>(),
      };
      setTabs((prevTabs) => [...prevTabs, newTab]);
      setActiveTab(newTab.id);
      handleSearch(newTab);
      setNewTabTerm("");
    }
  };

  const handleReload = async (tab: Tab) => {
    await handleSearch(tab);
  };

  const handleEditTabName = (id: number, newName: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, name: newName } : tab)),
    );
    setAlteringName(null); // Reset editing state
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (!isComposing && e.key === "Enter") {
      handleEditTabName(id, (e.target as HTMLInputElement).value);
    }
  };

  return (
    <div className={clsx(styles.container, notosansjp_regular.className)}>
      <div className={styles.header}>
        <h1 className={styles.title}>Avatar Wardrobe</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="newTabTerm"
            placeholder="Search Term"
            value={newTabTerm}
            onChange={(e) => setNewTabTerm(e.target.value)}
            className={clsx(styles.input)}
          />
          <button onClick={addTab} className={styles.button}>
            Add Tab
          </button>
        </div>
        <img src={gearoutline.src} alt="gear" className={styles.gearIcon} />
      </div>
      {tabs.length === 0 ? (
        <p className={clsx(styles.noTabs)}>
          No tabs created yet. Add a new tab to start searching.
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
                    onBlur={() => setAlteringName(null)} // Save changes when focus is lost
                    onKeyDown={(e) => handleKeyDown(e, tab.id)}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    className={styles.editInput}
                  />
                ) : (
                  <h2 className={clsx(styles.tabTitle)}>{tab.name}</h2>
                )}
                {alteringName !== tab.id && (
                  <img
                    src={editoutline.src}
                    alt="Edit"
                    className={styles.editIcon}
                    onClick={() => setAlteringName(tab.id)}
                  />
                )}
                <img
                  src={refreshoutline.src}
                  alt="Reload"
                  className={styles.reloadIcon}
                  onClick={() => handleReload(tab)}
                />
              </div>
              {loading ? (
                <p className={styles.newItems}>Loading...</p>
              ) : (
                <>
                  {newItems.length > 0 && (
                    <p className={styles.newItems}>New items found!</p>
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
                        <img
                          onClick={() => {
                            window.open(
                              product.shopURL + "items/" + product.productId,
                              "_blank",
                            );
                          }}
                          src={product.imageURL}
                          alt={product.productName}
                          className={styles.largeImage}
                        />
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
  );
}
