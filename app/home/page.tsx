"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./home.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";

export default function Home() {
  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="main-content">
          {/* Main Title */}
          <MainTitle />

          {/* Quick Access */}
          <div className="quick-access-section">
            <h3 className="section-heading">الوصول السريع</h3>
          </div>

          {/* Cards Container */}
          <div className="cards-container">
            {/* Card 1 */}
            <div className="service-card">
              <div className="card-icon-wrapper blue-icon">
                <span className="card-icon-emoji">🔄</span>
              </div>
              <h3 className="card-heading">إدارة العمليات</h3>
              <p className="card-description">متح صلاحيات الدخول مع</p>
              <p className="card-description">الصوائل</p>
              <button className="card-action-btn green-btn">الانتقال ←</button>
            </div>

            {/* Card 2 */}
            <div className="service-card">
              <div className="card-icon-wrapper green-icon">
                <span className="card-icon-emoji">📦</span>
              </div>
              <h3 className="card-heading">إدارة العقد/المخازن</h3>
              <p className="card-description">متح صلاحيات الدخول مع</p>
              <p className="card-description">الصوائل</p>
              <button className="card-action-btn">الانتقال ←</button>
            </div>

            {/* Card 3 */}
            <div className="service-card">
              <div className="card-icon-wrapper blue-icon">
                <span className="card-icon-emoji">👤</span>
              </div>
              <h3 className="card-heading">إدارة الموظفين</h3>
              <p className="card-description">متح صلاحيات الدخول مع</p>
              <p className="card-description">الصوائل</p>
              <button className="card-action-btn">الانتقال ←</button>
            </div>

            {/* Card 4 */}
            <div className="service-card">
              <div className="card-icon-wrapper orange-icon">
                <span className="card-icon-emoji">📍</span>
              </div>
              <h3 className="card-heading">إدارة الموقع</h3>
              <p className="card-description">متح صلاحيات الدخول مع</p>
              <p className="card-description">الصوائل</p>
              <button className="card-action-btn">الانتقال ←</button>
            </div>

            {/* Card 5 */}
            <div className="service-card">
              <div className="card-icon-wrapper blue-icon">
                <span className="card-icon-emoji">👥</span>
              </div>
              <h3 className="card-heading">إدارة المحررين</h3>
              <p className="card-description">متح صلاحيات الدخول مع</p>
              <p className="card-description">الصوائل</p>
              <button className="card-action-btn">الانتقال ←</button>
            </div>
          </div>

          {/* About System Section */}
          <div className="about-system">
            <h3 className="about-heading">عن النظام</h3>
            <p className="about-description">
              نظام جرد العقد والمخازن نو نظام متكامل لإدارة الأصول والعود في
              الكلية التقنية. يوفر النظام إمكانية تتبع العمليات، إدارة الموظفين
              والمواقع، وإدارة المحررين بطريقة سهلة وفعالة.
            </p>

            <div className="system-features">
              <div className="feature-item">
                <div className="feature-icon-box">📦</div>
                <p className="feature-label">إدارة العمليات</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">🔄</div>
                <p className="feature-label">إدارة العمليات</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">👥</div>
                <p className="feature-label">إدارة العمليات</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Button */}
      <button className="floating-btn">N</button>
    </div>
  );
}
