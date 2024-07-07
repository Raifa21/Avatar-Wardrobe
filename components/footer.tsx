"use client";
import * as React from "react";
import { Noto_Sans_JP } from "next/font/google";
import "../styles/footer.css";

type FooterProps = {
  language: string;
};

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <a className="footer-container-links" href="">
            {language === "JP" ? "このアプリについて" : "About this app"}
          </a>
          <a className="footer-container-links" href="#">
            {language === "JP" ? "お問い合わせ" : "Contact Us"}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
