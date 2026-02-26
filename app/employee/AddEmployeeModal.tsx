"use client";

import React from "react";
import styles from "./AddEmployeeModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEmployeeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalRoot} role="dialog" aria-modal="true" dir="rtl">
      <div className={styles.overlay} />

      <div className={styles.card} aria-label="Add employee modal">
        <button className={styles.close} onClick={onClose} aria-label="إغلاق">
          ✕
        </button>

        <h2 className={styles.headerTitle}>اضافة موظف جديد</h2>
        <p className={styles.subTitle}>أدخل بيانات الموظف الجديد</p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label className={styles.label}>الاسم الكامل</label>
            <input
              className={styles.input}
              name="fullName"
              placeholder="مثال: أحمد محمد علي"
              aria-label="الاسم الكامل"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>الرقم القومي</label>
            <input
              className={styles.input}
              name="ssn"
              placeholder="مثال: 1234567890123456"
              inputMode="numeric"
              aria-label="الرقم القومي"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>مكان الموظف</label>
            <select
              className={styles.select}
              name="place"
              aria-label="مكان الموظف"
              defaultValue=""
              required
            >
              <option value="" disabled>
                اختر الكلية
              </option>
              <option>كلية الهندسة</option>
              <option>كلية العلوم</option>
              <option>كلية الاداب</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>رقم الهاتف</label>
            <input
              className={styles.input}
              name="phone"
              placeholder="مثال: 0123456789"
              inputMode="tel"
              aria-label="رقم الهاتف"
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary}>
              أضفـه
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
