"use client";
import { useState } from 'react';
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import "./location.css";

export default function Location() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    building: '',
    items: 0 as number
  });

  const [locations, setLocations] = useState([
    { id: 1, name: 'معمل 101', building: 'المبنى الرئيسي', items: 15 },
    { id: 2, name: 'معمل 102', building: 'مبنى تقنية المعلومات', items: 15 },
    { id: 3, name: 'معمل 103', building: 'مبنى تقنية المعلومات', items: 15 },
    { id: 4, name: 'معمل 104', building: 'مبنى تقنية المعلومات', items: 15 },
    { id: 5, name: 'معمل 105', building: 'مبنى تقنية المعلومات', items: 15 },
  ]);

  const filteredLocations = locations.filter(loc =>
    loc.name.includes(searchQuery) || loc.building.includes(searchQuery)
  );

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.building) {
      setLocations([
        ...locations,
        {
          id: locations.length + 1,
          ...newLocation,
          items: Number(newLocation.items) || 0
        }
      ]);

      setNewLocation({ name: '', building: '', items: 0 });
      setShowAddModal(false);
    }
  };

  return (
    <div className="container">

      <Header />

      <div className="main-layout">

        <Sidebar />

        <main className="main-content">
          <MainTitle />

          <div className="location-wrapper">
            <div className="grid">

              {/* ========== Left Section ========== */}
              <div className="left-box">

                <div className="left-header">
                  <span className="left-title">قائمة المواقع ({locations.length})</span>
                  <button className="add-btn" onClick={() => setShowAddModal(true)}>+</button>
                </div>

                <div className="search-box">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="بحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="search-icon">🔍</span>
                </div>

                <div className="locations-list">
                  {filteredLocations.map((location) => (
                    <div key={location.id} className="location-card">

                      <div className="location-header">
                        <h3 className="location-name">{location.name}</h3>
                        <span className="location-items">{location.items} عُهدة</span>
                      </div>

                      <p className="location-building">{location.building}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* ========== Right Section ========== */}
              <div className="map-box">
                <div>
                  <div className="map-icon">📍</div>
                  اختر موقعاً لعرض التفاصيل
                </div>
              </div>

            </div>
          </div>

        </main>

      </div>

      {/* ========== Modal ========== */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2 className="modal-title">إضافة موقع جديد</h2>

            {/* Name */}
            <label className="modal-label">اسم الموقع</label>
            <input
              type="text"
              className="modal-input"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            />

            {/* Building */}
            <label className="modal-label">اسم المبنى</label>
            <input
              type="text"
              className="modal-input"
              value={newLocation.building}
              onChange={(e) => setNewLocation({ ...newLocation, building: e.target.value })}
            />

            {/* Items */}
            <label className="modal-label">عدد العُهد</label>
            <input
              type="number"
              className="modal-input"
              value={newLocation.items}
              onChange={(e) => setNewLocation({
                ...newLocation,
                items: Number(e.target.value)
              })}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>إلغاء</button>
              <button className="save-btn" onClick={handleAddLocation}>إضافة</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}