"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname(); // /home, /employee ...

  const links = [
    { href: "/home", icon: "🏠", text: "الرئيسية" },
    { href: "/operations", icon: "🔄", text: "العمليات" },
    { href: "/warehouse", icon: "📦", text: "العقد/المخازن" },
    { href: "/employee", icon: "👥", text: "الموظفين" },
    { href: "/location", icon: "📍", text: "المكان" },
    { href: "/editors", icon: "👨‍💼", text: "المجردين" },
  ];

  return (
    <aside className={styles["sidebar"]}>
      
      <nav className={styles["nav-menu"]}>
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles["nav-link"]} ${
                isActive ? styles["active"] : ""
              }`}
            >
              <span className={styles["nav-icon"]}>{link.icon}</span>
              <span className={styles["nav-text"]}>{link.text}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
