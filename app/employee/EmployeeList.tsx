"use client";

import { useState } from "react";
import AddEmployeeModal from "../employee/AddEmployeeModal";
import styles from "../employee/EmployeeList.module.css";
import Image from "next/image";

export default function EmployeeList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  // داتا مبدئية لحد ما API يخلص
  const employees = [
    { id: "1", name: "أحمد محمد", dept: "قسم الفيزياء", custody: "5" },
    { id: "2", name: "محمد علي", dept: "قسم الكيمياء", custody: "3" },
    { id: "3", name: "إبراهيم حسن", dept: "قسم الرياضيات", custody: "2" },
    { id: "4", name: "خالد سمير", dept: "قسم الأحياء", custody: "1" },
  ];

  return (
    <div className={styles["employee-list"]}>
      <div className={styles["header"]}>
        <h2 className={styles["title"]}> قائمة الموظفين</h2>
        <Image
          src="/icon/addEmployee.png"
          alt="addEmployee"
          width={20}
          height={20}
          className={styles["add-employee-icon"]} 
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className={styles["search-container"]}>
        <input
          type="text"
          className={styles["search-input"]}
          placeholder="بحث..."
        />
        <button className={styles["search-icon"]}>🔍</button>
      </div>

      <div className={styles["employee"]}>
        <ul className={styles["list"]}>
          {employees.map((emp) => (
            <li
              key={emp.id}
              className={styles["employee-item"]}
              onClick={() => onSelect(emp.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["name-custody"]}>
                <span className={styles["employee-name"]}>{emp.name}</span>
              </div>

              <span className={styles["employee-location"]}>{emp.dept}</span>
            </li>
          ))}
        </ul>
      </div>

      <AddEmployeeModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
