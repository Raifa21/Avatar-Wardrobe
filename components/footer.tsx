"use client";
import * as React from "react";
import { Noto_Sans_JP } from "next/font/google";
import "../styles/footer.css";
import Link from "next/link";
import Image from "next/image";
import xLogo from "../lib/x-logo/logo-black.png";
import githubLogo from "../lib/github-mark/github-mark.png";

type FooterProps = {
  language: string;
};

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <Link className="footer-container-links" href="/about_jp">
              {language === "JP" ? "このアプリについて" : "About this app"}
            </Link>
            <Link className="footer-container-links" href="/contact_jp">
              {language === "JP" ? "お問い合わせ" : "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
