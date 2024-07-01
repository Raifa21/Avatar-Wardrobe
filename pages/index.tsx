import { useState } from "react";
import axios from "axios";

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

export default function Home() {
  const [term, setTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get<{ items: Product[] }>(
        "/api/products/search",
        {
          params: { term },
        },
      );
      if (Array.isArray(response.data.items)) {
        setProducts(response.data.items);
      } else {
        console.error("Unexpected response format:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h1>Booth.pm Product Scraper</h1>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search term"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {products.map((product) => (
          <div key={product.productId}>
            <h2>{product.productName}</h2>
            <img src={product.imageURL} alt={product.productName} />
            <p>Brand: {product.productBrand}</p>
            <p>Price: {product.productPrice}円</p>
            <p>
              Shop: <a href={product.shopURL}>{product.shopName}</a>
            </p>
            <img src={product.shopImageURL} alt={product.shopName} />
          </div>
        ))}
      </div>
    </div>
  );
}
