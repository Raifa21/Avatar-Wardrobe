"use client";
import * as React from "react";
import { Noto_Sans_JP } from "next/font/google";
import Supporters from "@/components/supporters";
import Footer from "@/components/footer";
import "../styles/globals.css";
import styles from "../styles/home.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" }); // Load Noto Sans JP font

export default function About() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Whether the sidebar is open

  return (
    <div className={clsx(styles.container, notosansjp_regular.className)}>
      <Head>
        <title> Avatar Wardrobe </title>
        <meta
          name="description"
          content="Track and manage your favorite avatars and their outfits with Avatar Wardrobe."
        />
      </Head>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <Link className={styles.title} href="./index.tsx">
            Avatar Wardrobe
          </Link>
        </div>
        <div className={styles.content}>
          <br />
          <div className={styles.tabTitle}>Avatar Wardrobeについて</div>
          <p>
            Avatar
            Wardrobeは、お気に入りのアバターとそれらの対応商品を追跡および管理するためのアプリケーションです。
            <br />
            新しい商品は&nbsp;<Badge className={styles._newBadge}>New!</Badge>
            &nbsp;マークで表示され、新しい商品を探すのに役立ちます。
            <br />
            <br />
            もし質問等あれば、お手数ですが
            <Link className={styles.link} href="./contact.tsx" target="_blank">
              お問い合わせ
            </Link>
            よりご連絡ください。
          </p>
          <br />
          <p> このページのソースコードはGitHubにて公開しております。 </p>
          コントリビュートする場合は
          <Link
            className={styles.link}
            href="https://github.com/Raifa21/Avatar-Wardrobe "
            target="_blank"
          >
            こちら
          </Link>
          <br />
          <br />
        </div>
        <Supporters />
      </div>
      <Footer language="JP" />
    </div>
  );
}
