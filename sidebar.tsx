"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const links = [
    { href: "/home", icon: "fa-solid fa-house", text: "الرئيسية" },
    { href: "/operations", icon: "fa-solid fa-rotate", text: "العمليات" },
    { href: "/warehouse", icon: "fa-solid fa-box", text: "العهد/المخازن" },
    { href: "/employee", icon: "fa-solid fa-users", text: "الموظفين" },
    { href: "/location", icon: "fa-solid fa-location-dot", text: "المكان" },
    { href: "/editors", icon: "fa-solid fa-user-tie", text: "المجردين" },
    { href: "/login", icon: "fa-solid fa-sign-out-alt", text: "تسجيل الخروج" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <aside className={styles["sidebar"]}>
      {/* زر القائمة للموبايل */}
      <button 
        className={`${styles["menu-toggle"]} ${isMenuOpen ? styles["active"] : ""}`}
        onClick={toggleMenu}
      >
        القائمة
      </button>

      {/* القائمة */}
      <nav className={`${styles["nav-menu"]} ${isMenuOpen ? styles["active"] : ""}`}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles["nav-link"]} ${
                isActive ? styles["active"] : ""
              }`}
              onClick={closeMenu} // إغلاق القائمة عند الضغط على أي لينك
            >
              <span className={styles["nav-icon"]}>
                <i className={link.icon}></i>
              </span>
              <span className={styles["nav-text"]}>{link.text}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}