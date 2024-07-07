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
          <Link className={styles.title} href="./">
            Avatar Wardrobe
          </Link>
        </div>
        <div className={styles.content}>
          <br />
          <div className={styles.tabTitle}>About Avatar Wardrobe</div>
          Avatar Wardrobe is an application to track and manage your favorite
          avatars and their corresponding outfits.
          <br />
          <div className={styles.flexRow}>
            New items are displayed with a&nbsp;
            <Image src={newBadge.src} alt="newbadge" width={40} height={20} />
            &nbsp;mark.
          </div>
          <br />
          If you have any questions, please feel free to contact us
          <Link className={styles.link} href="./contact_en" target="_blank">
            &nbsp;here
          </Link>
          .
          <br />
          <p> The source code for this page is available on GitHub. </p>
          If you would like to contribute, please visit
          <Link
            className={styles.link}
            href="https://github.com/Raifa21/Avatar-Wardrobe"
            target="_blank"
          >
            &nbsp;here
          </Link>
          .
          <br />
          <br />
        </div>
        <Supporters language="EN" />
      </div>
      <Footer language="EN" />
    </div>
  );
}
