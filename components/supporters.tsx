"use client";

import * as React from "react";
import Link from "next/link";
import styles from "../styles/home.module.css";

const Supporters: React.FC = () => {
  return (
    <div className={styles.supporters}>
      以下の方々にご支援いただいております。ありがとうございます！！！！！
      <div className={styles.platinumSupport}></div>
      <div className={styles.goldSupport}>
        <div className={styles.supporterName}>・59 様</div>
      </div>
      <div className={styles.silverSupport}></div>
      <div className={styles.bronzeSupport}></div>
      <div className={styles.basicSupport}></div>
      <br />
      支援は
      <Link
        className={styles.link}
        href="https://raifa.fanbox.cc/"
        target="_blank"
      >
        こちら
      </Link>
      から！
    </div>
  );
};

export default Supporters;
