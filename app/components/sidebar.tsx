"use client";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["breadcrumb-sidebar"]}>الرئيسية</div>

      <nav className={styles["nav-menu"]}>
        <a href="#" className={`${styles["nav-link"]} ${styles["active"]}`}>
          <span className={styles["nav-icon"]}>🏠</span>
          <span className={styles["nav-text"]}>الرئيسية</span>
        </a>

        <a href="#" className={styles["nav-link"]}>
          <span className={styles["nav-icon"]}>🔄</span>
          <span className={styles["nav-text"]}>العمليات</span>
        </a>

        <a href="#" className={styles["nav-link"]}>
          <span className={styles["nav-icon"]}>📦</span>
          <span className={styles["nav-text"]}>العقد/المخازن</span>
        </a>

        <a href="#" className={styles["nav-link"]}>
          <span className={styles["nav-icon"]}>👥</span>
          <span className={styles["nav-text"]}>الموظفين</span>
        </a>

        <a href="#" className={styles["nav-link"]}>
          <span className={styles["nav-icon"]}>📍</span>
          <span className={styles["nav-text"]}>المكان</span>
        </a>

        <a href="#" className={styles["nav-link"]}>
          <span className={styles["nav-icon"]}>👨‍💼</span>
          <span className={styles["nav-text"]}>المحررين</span>
        </a>
      </nav>
    </aside>
  );
}
