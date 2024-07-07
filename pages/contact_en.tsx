"use client";
import * as React from "react";
import { Noto_Sans_JP } from "next/font/google";
import Footer from "@/components/footer";
import "../styles/globals.css";
import styles from "../styles/home.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import mailoutline from "../lib/eva-icons/outline/svg/email-outline.svg";
import xLogo from "../lib/x-logo/logo-black.png";

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
          <div className={styles.tabTitle}>Contact Us</div>
          For inquiries, please contact us at the following email address.
          <br />
          If you do not receive a reply, please contact us again via X (formerly
          Twitter).
          <br />
          <br />
          <div className={styles.flexRow}>
            <Image src={mailoutline.src} alt="mail" width={24} height={24} />
            &nbsp;{" "}
            <Link href="mailto:raifa.works@gmail.com">
              raifa.works@gmail.com
            </Link>
          </div>
          <br />
          <div className={styles.flexRow}>
            <Image src={xLogo.src} alt="x" width={22} height={22} />
            &nbsp;&nbsp;{" "}
            <Link href="https://twitter.com/raifa_trtr">@raifa_trtr</Link>
          </div>
          <br />
        </div>
      </div>
      <Footer language="EN" />
    </div>
  );
}
