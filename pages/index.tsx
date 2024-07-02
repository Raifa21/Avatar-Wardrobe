import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./index.module.css";
import { Noto_Sans_JP } from "next/font/google";
import clsx from "clsx";

const notosansjp = Noto_Sans_JP({ subsets: ["latin"], weight: "100" });

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
  };

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now(),
      name: newTabName,
      term: newTabTerm,
      products: [],
      seenItems: new Set<number>(),
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabId(newTab.id);
    setNewTabName(""); // Clear the input fields
    setNewTabTerm("");
  };

  const handleReload = async (tab: Tab) => {
    await handleSearch(tab);
  };

  const setActiveTab = (tabId: number) => {
    setActiveTabId(tabId);
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      handleSearch(tab);
    }
  };

  return (
    <div className={clsx(styles.container, notosansjp.className)}>
      <h1 className={styles.title}>Booth.pm Product Scraper</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="newTabName"
          placeholder="Tab Name"
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          id="newTabTerm"
          placeholder="Search Term"
          value={newTabTerm}
          onChange={(e) => setNewTabTerm(e.target.value)}
          className={styles.input}
        />
        <button onClick={addTab} className={styles.button}>
          Add Tab
        </button>
      </div>
      {tabs.length === 0 ? (
        <p className={styles.noTabs}>
          No tabs created yet. Add a new tab to start searching.
        </p>
      ) : (
        <Tabs defaultValue={tabs[0]?.id.toString()} className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id.toString()}
                onClick={() => setActiveTab(tab.id)}
                className={styles.tabTrigger}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id.toString()}
              className={styles.tabsContent}
            >
              <button
                onClick={() => handleReload(tab)}
                className={styles.reloadButton}
              >
                Reload
              </button>
              <h2 className={styles.tabTitle}>{tab.name}</h2>
              {newItems.length > 0 && (
                <p className={styles.newItems}>New items found!</p>
              )}
              <div className={styles.grid}>
                {tab.products.map((product) => (
                  <div
                    onClick={() => {
                      window.open(
                        product.shopURL + "items/" + product.productId,
                        "_blank",
                      );
                    }}
                    key={product.productId}
                    className={`${styles.product} ${
                      !tab.seenItems.has(product.productId) && styles.newProduct
                    }`}
                  >
                    <img
                      src={product.imageURL}
                      alt={product.productName}
                      className={styles.largeImage}
                    />
                    <p className={styles.productName}>{product.productName}</p>
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
                    <div className={styles.priceText}>
                      ¥ {product.productPrice}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
