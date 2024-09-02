"use client";

import * as React from "react";
import Link from "next/link";
import styles from "../styles/home.module.css";

type supportersProps = {
  language: string;
};

const Supporters: React.FC<supportersProps> = ({ language }) => {
  return (
    <div className={styles.supporters}>
      {language === "JP"
        ? "以下の方々にご支援いただいております。ありがとうございます！！！！！"
        : "This page is supported by the following people. Thank you!"}
      <div className={styles.platinumSupport}></div>
      <div className={styles.goldSupport}>
        ・59 {language === "JP" ? "様" : ""}
      </div>
      <div className={styles.silverSupport}>
        ・ネフィリア {language === "JP" ? "様" : ""}
      </div>
      <div className={styles.bronzeSupport}>
        ・東雲りん {language === "JP" ? "様" : ""}
        <br />・
        <Link href="https://okomeshop.booth.pm/" target="_blank">
          おこめのおいしいお店
        </Link>
        &nbsp;{language === "JP" ? "様" : ""}
        <br />
        ・朝霧魅玲 {language === "JP" ? "様" : ""}
      </div>
      <div className={styles.basicSupport}></div>
      <br />
      {language === "JP" ? "支援は" : "Support me "}
      <Link
        className={styles.link}
        href="https://raifa.fanbox.cc/"
        target="_blank"
      >
        {language === "JP" ? "こちら" : "here"}
      </Link>
      {language === "JP" ? "から！" : " !"}
    </div>
  );
};

export default Supporters;
