import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./index.module.css";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTabs = localStorage.getItem("tabs");
      if (savedTabs) {
        const parsedTabs = JSON.parse(savedTabs).map((tab: Tab) => ({
          ...tab,
          seenItems: new Set(tab.seenItems),
        }));
        setTabs(parsedTabs);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tabsToSave = tabs.map((tab) => ({
        ...tab,
        seenItems: Array.from(tab.seenItems),
      }));
      localStorage.setItem("tabs", JSON.stringify(tabsToSave));
    }
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
    const seenItems = new Set(tab.seenItems);

    const newItems = products.filter(
      (product) => !seenItems.has(product.productId),
    );
    newItems.forEach((product) => seenItems.add(product.productId));

    setTabs(
      tabs.map((t) => (t.id === tab.id ? { ...t, products, seenItems } : t)),
    );
    setNewItems(newItems);
    setError(null); // Clear previous error
  };

  const addTab = (name: string, term: string) => {
    const newTab: Tab = {
      id: Date.now(),
      name,
      term,
      products: [],
      seenItems: new Set(),
    };
    setTabs([...tabs, newTab]);
  };

  const setActiveTab = (tabId: number) => {
    setActiveTabId(tabId);
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      handleSearch(tab);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booth.pm Product Scraper</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="newTabTerm"
          placeholder="Search Term"
          className={styles.input}
        />
        <button
          onClick={() => {
            const term = (
              document.getElementById("newTabTerm") as HTMLInputElement
            ).value;
            addTab(`Tab ${tabs.length + 1}`, term);
          }}
          className={styles.button}
        >
          Add Tab
        </button>
      </div>
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
            <h2 className={styles.tabTitle}>{tab.name}</h2>
            {newItems.length > 0 && (
              <p className={styles.newItems}>New items found!</p>
            )}
            {tab.products.map((product) => (
              <div
                key={product.productId}
                className={`${styles.product} ${!tab.seenItems.has(product.productId) && styles.newProduct}`}
              >
                <h3>{product.productName}</h3>
                <Image
                  src={product.imageURL}
                  alt={product.productName}
                  width={100}
                  height={100}
                />
                <p>Brand: {product.productBrand}</p>
                <p>Price: {product.productPrice}円</p>
                <p>
                  Shop:{" "}
                  <a
                    href={product.shopURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.shopName}
                  </a>
                </p>
                <Image
                  src={product.shopImageURL}
                  alt={product.shopName}
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
