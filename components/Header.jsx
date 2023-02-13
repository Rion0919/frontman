import React from "react";
import Head from "next/head";
import styles from "src/styles/header.module.css";
import Link from "next/link";

const Header = ({ title, user }) => {
  return (
    <div>
      <Head>
        <title>Frontman</title>
        <meta name="description" content="front manegement system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h1>Frontman</h1>
        {title && <span>{title}</span>}
        <div className={styles.userInfo}>
          <span>{user}</span>
          <Link href="/" className={styles.logout}>
            ログアウト
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
