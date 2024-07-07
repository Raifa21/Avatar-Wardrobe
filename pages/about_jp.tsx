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
import newBadge from "../lib/newbadge.png";
import Image from "next/image";

const notosansjp_regular = Noto_Sans_JP({ subsets: ["latin"], weight: "300" }); // Load Noto Sans JP font

export default function About() {
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
          <Link className={styles.title} href="./">
            Avatar Wardrobe
          </Link>
        </div>
        <div className={styles.content}>
          <br />
          <div className={styles.tabTitle}>Avatar Wardrobeについて</div>
          Avatar
          Wardrobeは、お気に入りのアバターとそれらの対応商品を追跡および管理するためのアプリケーションです。
          <br />
          <div className={styles.flexRow}>
            新しい商品は&nbsp;
            <Image src={newBadge.src} alt="newbadge" width={40} height={20} />
            &nbsp;マークで表示されます。
          </div>
          <br />
          もし質問等あれば、お手数ですが
          <Link className={styles.link} href="./contact_jp" target="_blank">
            こちら
          </Link>
          よりご連絡ください。
          <br />
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
        <Supporters language="JP" />
      </div>
      <Footer language="JP" />
    </div>
  );
}
