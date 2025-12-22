"use client";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>نظام جرد العهد والمخازن</div>
      <div className={styles["header-actions"]}>
        <button className={styles["profile-btn"]}><i className="fa-regular fa-user"></i></button>
      </div>
    </header>
  );
}
