"use client";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>نظام جرد العهد والمخازن</div>
      <div className={styles["search-container"]}>
        <input
          type="text"
          className={styles["search-input"]}
          placeholder="بحث..."
        />
        <button className={styles["search-icon"]}>🔍</button>
      </div>
      <div className={styles["header-actions"]}>
        <button className={styles["notification-btn"]}>🔔</button>
        <button className={styles["profile-btn"]}>👤</button>
      </div>
    </header>
  );
}
