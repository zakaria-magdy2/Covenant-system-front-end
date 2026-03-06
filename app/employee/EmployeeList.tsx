"use client";

import { useState, useEffect } from "react";
import AddEmployeeModal from "../employee/AddEmployeeModal";
import styles from "../employee/EmployeeList.module.css";
import Image from "next/image";
import { fetchWithAuth } from "../lib/fetchWithAuth";

type Employee = {
  name: string;
  phoneNumber: string;
  nationalNumber: string;
  building: string;
};

export default function EmployeeList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await fetchWithAuth("/api/getAllEmployee", {
          method: "GET",
          credentials: "include", // مهم جدًا
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.nationalNumber.includes(searchTerm),
  );
  return (
    <div className={styles["employee-list"]}>
      {/* Header */}
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>قائمة الموظفين</h2>
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
      {/* Search */}
      <div className={styles["search-container"]}>
        <input
          type="text"
          className={styles["search-input"]}
          placeholder="بحث..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles["search-icon"]}>🔍</button>
      </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}
      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Employees List */}
      {!loading && !error && (
        <div className={styles["employee"]}>
          <ul className={styles["list"]}>
            {filteredEmployees.map((emp) => (
              <li
                key={emp.nationalNumber}
                className={styles["employee-item"]}
                onClick={() => {
                  onSelect(String(emp.nationalNumber));
                }}
                style={{ cursor: "pointer" }}
              >
                <div className={styles["name-custody"]}>
                  <span className={styles["employee-name"]}>{emp.name}</span>
                </div>

                <span className={styles["employee-location"]}>
                  {emp.building}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <AddEmployeeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        addEmployee={(emp) =>
          setEmployees((prev) => [emp as Employee, ...prev])
        }
      />
    </div>
  );
}
