"use client";

import { usePathname } from "next/navigation";
import styles from "./mainTitle.module.css";

export default function MainTitle() {
  const pathname = usePathname();

  const pages: Record<
    string,
    {
      title: string;
      line1?: string;
      line2?: string;
      bottomTitle?: string;
      breadcrumb?: string;
    }
  > = {
    "/home": {
      title: "نظام جرد العهد والمخازن",
      line1: "مرحبا بك في نظام إدارة العهد والمخازن",
      bottomTitle: "لكلية العلوم",
      breadcrumb: "الرئيسية",
    },
    "/operations": {
      title: "العمليات",
      line1: "أدارة عمليات الصرف والنقل والارجاع",
      breadcrumb: "الرئيسية > العمليات",
    },
    "/employee": {
      title: "الموظفين",
      line1: "عرض وإدارة بيانات الموظفين والعهد المسلمه لهم",
      breadcrumb: "الرئيسية > الموظفين",
    },
    "/warehouse": {
      title: "العهدة / المخازن",
      line1: "إدارة المخزون والعهد",
      breadcrumb: "الرئيسية > العهدة / المخازن",
    },
    "/location": {
      title: "المكان",
      line1: "عرض وإدارة مواقع التخزين في الكلية",
      breadcrumb: "الرئيسية > المكان",
    },
    "/editors": {
      title: "المجردين",
      line1:
        "إدارة حسابات المُجرِّدين الخارجيين ومنحهم صلاحيات الوصول لتطبيق الجرد عبر الموبايل",
      breadcrumb: "الرئيسية > المجردين",
    },
  };

  const current = pages[pathname] || {
    title: "لوحة التحكم",
    breadcrumb: "الرئيسية > لوحة التحكم",
  };

  return (
    <div
      className={styles["page-title-section"]}
      style={{
        textAlign: pathname === "/home" ? "center" : "right",
      }}
    >
      {/* Breadcrumb */}
      <div className={styles["breadcrumb"]}>{current.breadcrumb}</div>

      {/* Title */}
      <h1 className={styles["main-title"]}>{current.title}</h1>

      {/* lines */}
      {current.line1 && (
        <p className={styles["welcome-text"]}>{current.line1}</p>
      )}
      {current.line2 && (
        <p className={styles["welcome-text"]}>{current.line2}</p>
      )}

      {/* bottom title */}
      {current.bottomTitle && (
        <h2 className={styles["college-title"]}>{current.bottomTitle}</h2>
      )}
    </div>
  );
}
