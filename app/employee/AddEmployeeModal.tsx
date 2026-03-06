"use client";

import React, { useEffect, useState } from "react";
import styles from "./AddEmployeeModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addEmployee: (emp: unknown) => void;
}

type Room = { roomName: string };
type Floor = { name: string; rooms: Room[] };
type Building = { name: string; floors: Floor[] };

export default function AddEmployeeModal({
  isOpen,
  onClose,
  addEmployee,
}: Props) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitel, setJobTitel] = useState("");

  const [loading, setLoading] = useState(false);

  // تحميل المباني عند فتح المودال
  useEffect(() => {
    if (!isOpen) return;

    const loadBuildings = async () => {
      try {
        const res = await fetch("/api/getBuildings", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setBuildings(data);
      } catch (err) {
        alert("فشل تحميل المباني ❌");
      }
    };

    loadBuildings();
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedRoom) return;

    setLoading(true);

    try {
      const res = await fetch("/api/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          ssn,
          phoneNumber,
          jobTitel, // مهم بنفس الاسم
          roomName: selectedRoom,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      alert("تم إضافة الموظف بنجاح ✅");

      const newEmployee = {
        name,
        building: selectedBuilding?.name,
        phone: phoneNumber,
        nationalNumber: ssn,
      };

      addEmployee(newEmployee);

      // Reset
      setName("");
      setSsn("");
      setPhoneNumber("");
      setJobTitel("");
      setSelectedBuilding(null);
      setSelectedFloor(null);
      setSelectedRoom("");

      onClose();
    } catch (err) {
      alert("حدث خطأ أثناء الإضافة ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalRoot} dir="rtl">
      <div className={styles.overlay} />

      <div className={styles.card}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.headerTitle}>إضافة موظف جديد</h2>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {/* الاسم */}
          <div className={styles.field}>
            <label className={styles.label}>الاسم الكامل</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* الرقم القومي */}
          <div className={styles.field}>
            <label className={styles.label}>الرقم القومي</label>
            <input
              className={styles.input}
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
              required
            />
          </div>

          {/* رقم الهاتف */}
          <div className={styles.field}>
            <label className={styles.label}>رقم الهاتف</label>
            <input
              className={styles.input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* الوظيفة */}
          <div className={styles.field}>
            <label className={styles.label}>الوظيفة</label>
            <input
              className={styles.input}
              value={jobTitel}
              onChange={(e) => setJobTitel(e.target.value)}
              required
            />
          </div>

          {/* المبنى */}
          <div className={styles.field}>
            <label className={styles.label}>المبنى</label>
            <select
              className={styles.select}
              onChange={(e) => {
                const building = buildings.find(
                  (b) => b.name === e.target.value,
                );
                setSelectedBuilding(building || null);
                setSelectedFloor(null);
                setSelectedRoom("");
              }}
              value={selectedBuilding?.name || ""}
              required
            >
              <option value="" disabled>
                اختر المبنى
              </option>
              {buildings.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* الدور */}
          {selectedBuilding && (
            <div className={styles.field}>
              <label className={styles.label}>الدور</label>
              <select
                className={styles.select}
                onChange={(e) => {
                  const floor = selectedBuilding.floors.find(
                    (f) => f.name === e.target.value,
                  );
                  setSelectedFloor(floor || null);
                  setSelectedRoom("");
                }}
                value={selectedFloor?.name || ""}
                required
              >
                <option value="" disabled>
                  اختر الدور
                </option>
                {selectedBuilding.floors.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* الغرفة */}
          {selectedFloor && (
            <div className={styles.field}>
              <label className={styles.label}>الغرفة</label>
              <select
                className={styles.select}
                onChange={(e) => setSelectedRoom(e.target.value)}
                value={selectedRoom}
                required
              >
                <option value="" disabled>
                  اختر الغرفة
                </option>
                {selectedFloor.rooms.map((r) => (
                  <option key={r.roomName} value={r.roomName}>
                    {r.roomName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={handleSubmit}
              disabled={!selectedRoom || loading}
            >
              {loading ? "جاري الإضافة..." : "أضفـه"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
