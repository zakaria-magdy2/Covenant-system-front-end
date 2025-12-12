"use client";
import { useEffect, useState } from "react";
import styles from "./EmployeeDetails.module.css";
import Image from "next/image";

type Op = { type: string; item: string; qty: number; date: string };
type Asset = { item: string; qty: number; lastTransfer?: string };
type Emp = {
  id: string;
  name: string;
  jobTitle?: string;
  department?: string;
  phone?: string;
  nationalId?: string;
  avatarUrl?: string;
  operations?: Op[];
  assets?: Asset[];
};

/* بيانات تجريبية */
const DUMMY: Record<string, Emp> = {
  "1": {
    id: "1",
    name: "أحمد محمد علي",
    jobTitle: "مهندس",
    department: "قسم الفيزياء",
    phone: "01274244766",
    nationalId: "123456789123",
    avatarUrl: "/icon/lucide_user-round.svg",
    assets: [
      { item: "جهاز كمبيوتر محمول Dell", qty: 1, lastTransfer: "2024-06-20" },
      { item: "شاشة LCD 24 بوصة", qty: 2, lastTransfer: "2025-01-10" },
    ],
    operations: [
      { type: "نقل", item: "لوحة مفاتيح", qty: 3, date: "2025-09-20" },
      { type: "نقل", item: "شاشة LCD 24 بوصة", qty: 2, date: "2025-01-10" },
      { type: "استلام", item: "ماوس", qty: 1, date: "2025-10-01" },
    ],
  },

  "2": {
    id: "2",
    name: "محمد علي",
    jobTitle: "فني مختبر",
    department: "قسم الكيمياء",
    phone: "01012345678",
    nationalId: "987654321987",
    avatarUrl: "/icon/lucide_user-round.svg",
    assets: [{ item: "ميكروسكوب", qty: 1, lastTransfer: "2024-08-10" }],
    operations: [
      { type: "استلام", item: "ميكروسكوب", qty: 1, date: "2024-08-10" },
    ],
  },

  "3": {
    id: "3",
    name: "إبراهيم حسن",
    jobTitle: "محاضر",
    department: "قسم الرياضيات",
    phone: "01122334455",
    nationalId: "321654987123",
    avatarUrl: "/icon/lucide_user-round.svg",
    assets: [{ item: "حاسبة علمية", qty: 1, lastTransfer: "2023-05-12" }],
    operations: [
      { type: "استلام", item: "حاسبة علمية", qty: 1, date: "2023-05-12" },
    ],
  },

  "4": {
    id: "4",
    name: "خالد سمير",
    jobTitle: "معيد",
    department: "قسم الأحياء",
    phone: "01500998877",
    nationalId: "998877665544",
    avatarUrl: "/icon/lucide_user-round.svg",
    assets: [],
    operations: [],
  },
};

function EmptyDetails() {
  return (
    <div className={styles.emptyBox}>
      <div className={styles.text}>
        <Image
          src="/icon/lucide_user-round.svg"
          alt="Employee"
          width={50}
          height={50}
          className={styles["add-employee-icon"]}
        />
        اختر موظف لعرض التفاصيل
      </div>
    </div>
  );
}

/**
 * EmployeeDetails
 * Props:
 *  - selectedId?: string | null
 *  - employee?: Emp | null
 */
export default function EmployeeDetails({
  selectedId,
  employee,
}: {
  selectedId?: string | null;
  employee?: Emp | null;
}) {
  const [emp, setEmp] = useState<Emp | null>(employee ?? null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"assets" | "ops">("ops");

  useEffect(() => {
    if (employee) {
      setEmp(employee);
      return;
    }
    if (!selectedId) {
      setEmp(null);
      return;
    }

    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/employee/${selectedId}`);
        if (!res.ok) throw new Error("no api");
        const data = await res.json();
        if (!mounted) return;
        setEmp(data);
      } catch {
        if (!mounted) return;
        setEmp(DUMMY[selectedId] ?? null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedId, employee]);

  if (!selectedId && !emp) return <EmptyDetails />;
  if (loading) return <div className={styles.emptyBox}>...جاري التحميل</div>;
  if (!emp)
    return <div className={styles.emptyBox}>لا توجد بيانات للموظف المحدد</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src={emp.avatarUrl ?? "/icon/lucide_user-round.svg"}
              alt={emp.name}
              width={64}
              height={64}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{emp.name}</div>
            <div className={styles.job}>
              <Image
                src="/icon/pixel_business.svg"
                alt="Job"
                width={16}
                height={16}
              />
              {emp.department ?? emp.jobTitle}
            </div>
            <div className={styles.contact}>
              <Image
                src="/icon/fluent_call-20-regular.svg"
                alt="Job"
                width={16}
                height={16}
              />
              {emp.phone}
            </div>
            <div className={styles.contact}>
              <Image
                src="/icon/lucide_user-round.svg"
                alt="Job"
                width={16}
                height={16}
              />
              {emp.nationalId}
            </div>
          </div>
        </div>

        <button className={styles.printBtn}>طباعة العهد</button>
      </div>

      <div className={styles.tabsRow}>
        <button
          className={`${styles.tabBtn} ${
            tab === "assets" ? styles.tabActive : ""
          }`}
          onClick={() => setTab("assets")}
        >
          العهد المملوكة
        </button>

        <button
          className={`${styles.tabBtn} ${
            tab === "ops" ? styles.tabActive : ""
          }`}
          onClick={() => setTab("ops")}
        >
          سجل العمليات
        </button>
      </div>

      <div className={styles.card}>
        {tab === "assets" ? (
          <div className={styles.tableWrap}>
            <table className={`${styles.table} ${styles.assetsTable}`}>
              <thead>
                <tr>
                  <th className={styles.colName}>اسم الصنف</th>
                  <th className={styles.colQty}>الكمية</th>
                  <th className={styles.colDate}>تاريخ آخر عملية</th>
                </tr>
              </thead>
              <tbody>
                {emp.assets && emp.assets.length > 0 ? (
                  emp.assets.map((a, i) => (
                    <tr key={i}>
                      <td className={styles.colName}>{a.item}</td>
                      <td className={styles.colQty}>{a.qty}</td>
                      <td className={styles.colDate}>
                        {a.lastTransfer ?? "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "center", padding: "18px" }}
                    >
                      لا توجد عُهد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.colAction}>نوع العملية</th>
                  <th className={styles.colName}>الصنف</th>
                  <th className={styles.colQty}>الكمية</th>
                  <th className={styles.colDate}>تاريخ العملية</th>
                </tr>
              </thead>
              <tbody>
                {emp.operations && emp.operations.length > 0 ? (
                  emp.operations.map((op, i) => (
                    <tr key={i}>
                      <td className={styles.colAction}>
                        {/* نعرض نوع العملية فقط (نقل/استلام/...) */}
                        <span className={styles.actionLabel}>{op.type}</span>
                      </td>
                      <td className={styles.colName}>{op.item}</td>
                      <td className={styles.colQty}>{op.qty}</td>
                      <td className={styles.colDate}>{op.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", padding: "18px" }}
                    >
                      لا توجد عمليات مسجلة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
