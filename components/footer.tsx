"use client";
import * as React from "react";
import { Noto_Sans_JP } from "next/font/google";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-container-links">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Github Repository</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
