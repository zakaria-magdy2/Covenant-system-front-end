"use client";

import { useState } from "react";
import "./employee.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";

export default function Employee() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar />

        <main className="main-content">
          {/* Main Title */}
          <MainTitle />

          <div className="contentEmployee">
            {/* Employee List */}
            <EmployeeList onSelect={setSelectedId} />

            {/* Employee Details */}
            <EmployeeDetails selectedId={selectedId} />
          </div>
        </main>
      </div>
    </div>
  );
}
