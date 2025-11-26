import { useState } from "react";
import "./App.css";

// NOTE: when an asset lives in the `public/` folder, reference it with an absolute path.
// This avoids bundler import issues and prevents the image from being treated as a module.
const logoPath = "/logo.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="app-root">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <img src={logoPath} alt="AFC logo" className="church-logo" />
          <div className="church-title">
            <h1>Apostolic Faith Church</h1>
            <div className="tagline">Birth.Build.Bless</div>
          </div>
        </div>
      </header>

      {/* TOP NAV (mobile-friendly horizontal tabs) */}
      <nav className="top-nav-row">
        <div className="top-nav">
          {["dashboard", "members", "offerings", "tithes", "expenses", "reports"].map(
            (tab) => (
              <button
                key={tab}
                className={`top-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>
      </nav>

      {/* MAIN */}
      <main className="main-content">
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

/* ---------- Pages (kept simple) ---------- */

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

function Members() {
  return (
    <>
      <h2>Members</h2>
      <div className="form-card">
        <label>Name</label>
        <input placeholder="Member name" />
        <label>Phone</label>
        <input placeholder="Phone" />
        <button className="primary-btn">Save Member</button>
      </div>
    </>
  );
}

function Offerings() {
  return (
    <>
      <h2>Offerings</h2>
      <div className="form-card">
        <label>Amount</label>
        <input type="number" placeholder="Amount" />
        <button className="primary-btn">Save Offering</button>
      </div>
    </>
  );
}

function Tithes() {
  return (
    <>
      <h2>Tithes</h2>
      <div className="form-card">
        <label>Amount</label>
        <input type="number" placeholder="Amount" />
        <button className="primary-btn">Save Tithe</button>
      </div>
    </>
  );
}

function Expenses() {
  return (
    <>
      <h2>Expenses</h2>
      <div className="form-card">
        <label>Amount</label>
        <input type="number" placeholder="Amount" />
        <button className="primary-btn">Save Expense</button>
      </div>
    </>
  );
}

function Reports() {
  return (
    <>
      <h2>Reports</h2>
      <p className="muted">Reports coming soon.</p>
    </>
  );
}
