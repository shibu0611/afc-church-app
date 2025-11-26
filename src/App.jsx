import { useState } from "react";
import "./App.css";
import logo from "../public/logo.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="app-root">
      {/* ---------- HEADER ---------- */}
      <header className="header">
        <img src={logo} alt="Logo" />
        <div>
          <h1 className="title">Apostolic Faith Church</h1>
          <div className="tagline">Birth.Build.Bless</div>
        </div>
      </header>

      {/* ---------- TOP NAV TABS ---------- */}
      <div className="top-nav-wrapper">
        <div className="top-nav">
          {["dashboard", "members", "offerings", "tithes", "expenses", "reports"].map(
            (tab) => (
              <div
                key={tab}
                className={`top-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            )
          )}
        </div>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="main">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "members" && <Members />}
        {activeTab === "offerings" && <Offerings />}
        {activeTab === "tithes" && <Tithes />}
        {activeTab === "expenses" && <Expenses />}
        {activeTab === "reports" && <Reports />}
      </main>
    </div>
  );
}

/* ---------------------------------------------------------
                    DASHBOARD PAGE
----------------------------------------------------------*/
function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>

      <p className="muted">Monthly summary for November 2025:</p>

      <div className="dashboard-grid">
        <div className="summary-card members">
          <h3>Members</h3>
          <div className="summary-value">0</div>
        </div>

        <div className="summary-card offerings">
          <h3>Offerings</h3>
          <div className="summary-value">₹ 0.00</div>
        </div>

        <div className="summary-card tithes">
          <h3>Tithes</h3>
          <div className="summary-value">₹ 0.00</div>
        </div>

        <div className="summary-card expenses">
          <h3>Expenses</h3>
          <div className="summary-value">₹ 0.00</div>
        </div>

        <div className="summary-card balance">
          <h3>Balance</h3>
          <div className="summary-value">₹ 0.00</div>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------
                      MEMBERS PAGE
----------------------------------------------------------*/
function Members() {
  return (
    <>
      <h2>Members</h2>

      <div className="form-card">
        <label>Name</label>
        <input placeholder="Enter member name" />

        <label>Phone</label>
        <input placeholder="Enter phone number" />

        <label>Address</label>
        <textarea placeholder="Enter address" />

        <button className="primary-btn">Save Member</button>
      </div>
    </>
  );
}

/* ---------------------------------------------------------
                     OFFERINGS PAGE
----------------------------------------------------------*/
function Offerings() {
  return (
    <>
      <h2>Offerings</h2>

      <div className="form-card">
        <label>Amount (₹)</label>
        <input type="number" placeholder="Enter amount" />

        <label>Date</label>
        <input type="date" />

        <label>Description</label>
        <textarea placeholder="Optional notes" />

        <button className="primary-btn">Save Offering</button>
      </div>
    </>
  );
}

/* ---------------------------------------------------------
                     TITHES PAGE
----------------------------------------------------------*/
function Tithes() {
  return (
    <>
      <h2>Tithes</h2>

      <div className="form-card">
        <label>Amount (₹)</label>
        <input type="number" placeholder="Enter amount" />

        <label>Date</label>
        <input type="date" />

        <label>Description</label>
        <textarea placeholder="Optional notes" />

        <button className="primary-btn">Save Tithe</button>
      </div>
    </>
  );
}

/* ---------------------------------------------------------
                     EXPENSES PAGE
----------------------------------------------------------*/
function Expenses() {
  return (
    <>
      <h2>Expenses</h2>

      <div className="form-card">
        <label>Amount (₹)</label>
        <input type="number" placeholder="Enter amount" />

        <label>Date</label>
        <input type="date" />

        <label>Category</label>
        <input placeholder="Food, Travel, etc." />

        <label>Description</label>
        <textarea placeholder="Add details" />

        <button className="primary-btn">Save Expense</button>
      </div>
    </>
  );
}

/* ---------------------------------------------------------
                     REPORTS PAGE
----------------------------------------------------------*/
function Reports() {
  return (
    <>
      <h2>Reports</h2>

      <p className="muted">Reports module coming soon…</p>
    </>
  );
}
