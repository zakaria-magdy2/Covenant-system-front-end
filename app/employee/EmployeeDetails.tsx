"use client";
import { useEffect, useState } from "react";
import styles from "./EmployeeDetails.module.css";
import Image from "next/image";
import { fetchWithAuth } from "../lib/fetchWithAuth";

type Op = { type: string; item: string; qty: number; date: string };
type Asset = { item: string; qty: number; lastTransfer?: string };
type Emp = {
  id: string;
  name: string;
  jobTitle?: string;
  building?: string;
  phone?: string;
  nationalId?: string;
  avatarUrl?: string;
  operations?: Op[];
  assets?: Asset[];
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
        const res = await fetchWithAuth(`/api/employeeById/${selectedId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("no api");
        const data = await res.json();
        if (!mounted) return;
        setEmp(data);
      } catch (err) {
        if (!mounted) return;
        setEmp(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedId, employee]);

  const handlePrint = () => {
    if (!emp) return;
    window.open(`/api/printEmployeePdf/${emp.nationalId}`, "_blank");
  };

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
              {emp.building}
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

        <button className={styles.printBtn} onClick={handlePrint}>
          طباعة العهد
        </button>
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
