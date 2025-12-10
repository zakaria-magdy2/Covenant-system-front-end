"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css"; 

export default function LoginPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }
    router.push("/home");
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="circle"><i className="fa-regular fa-building"></i></div>
        <h2 className="title">نظام العهد والمخازن</h2>
        <p className="subtitle">لكلية العلوم جامعة قناة السويس</p>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label>اسم المستخدم</label>
            <input
              type="text"
              placeholder="أدخل اسم المستخدم"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span className="icon"><i className="fa-regular fa-user"></i></span>
          </div>

          <div className="input-wrapper">
            <label>كلمة المرور</label>
            <input
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon"><i className="fa-solid fa-lock"></i></span>
          </div>

          <button type="submit" className="login-btn">تسجيل الدخول</button>

          {error && <p className="eror-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
