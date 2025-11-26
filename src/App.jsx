import React, { useState } from "react";
import "./App.css";

const TABS = ["Dashboard", "Members", "Offerings", "Tithes", "Expenses", "Reports"];

function Header({ mobileOpen, setMobileOpen }) {
  return (
    <header className="header-left">
      <div className="header-inner">
        <img src="/logo.jpg" alt="AFC logo" className="church-logo" />
        <div className="church-title">
          <h1>Apostolic Faith Church</h1>
          <div className="tagline">Birth.Build.Bless</div>
        </div>

        {/* hamburger for very small screens; toggles mobile nav */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function SideNav({ active, setActive }) {
  return (
    <nav className="side-menu" aria-label="Main navigation">
      {TABS.map((t) => (
        <button
          key={t}
          className={t === active ? "active" : ""}
          onClick={() => setActive(t)}
        >
          {t}
        </button>
      ))}
    </nav>
  );
}

function TopNav({ active, setActive }) {
  return (
    <div className="top-nav" role="tablist" aria-label="Top navigation">
      {TABS.map((t) => (
        <button
          key={t}
          className={`top-tab ${t === active ? "active" : ""}`}
          onClick={() => setActive(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function DashboardCards() {
  // example values (replace with real data if you have)
  const values = {
    Members: 0,
    Offerings: "₹ 0.00",
    Tithes: "₹ 0.00",
    Expenses: "₹ 0.00",
    Balance: "₹ 0.00",
  };

  return (
    <div>
      <p className="summary-label">Monthly summary for {new Date().toLocaleString("default", { month: "long", year: "numeric" })}:</p>
      <div className="dashboard-grid">
        <div className="summary-card members">
          <h3>Members</h3>
          <div className="summary-value">{values.Members}</div>
        </div>
        <div className="summary-card income">
          <h3>Offerings</h3>
          <div className="summary-value">{values.Offerings}</div>
        </div>
        <div className="summary-card tithes">
          <h3>Tithes</h3>
          <div className="summary-value">{values.Tithes}</div>
        </div>
        <div className="summary-card expense">
          <h3>Expenses</h3>
          <div className="summary-value">{values.Expenses}</div>
        </div>
        <div className="summary-card balance">
          <h3>Balance</h3>
          <div className="summary-value">{values.Balance}</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-root">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="app-body">
        {/* desktop sidebar (hidden on small screens) */}
        <SideNav active={active} setActive={(t) => { setActive(t); setMobileOpen(false); }} />

        {/* main area */}
        <main className="main-content">
          {/* top nav visible only on small screens */}
          <div className={`top-nav-wrapper ${mobileOpen ? "open" : ""}`}>
            <TopNav active={active} setActive={(t) => { setActive(t); setMobileOpen(false); }} />
          </div>

          <h2>{active}</h2>

          {active === "Dashboard" && (
            <>
              <DashboardCards />
            </>
          )}

          {/* simple placeholders for other tabs */}
          {active === "Members" && (
            <div className="panel-card">
              <h3>Add Member</h3>
              <p style={{ color: "var(--muted)" }}>Member form goes here (keeps previous fields).</p>
            </div>
          )}

          {active === "Offerings" && (
            <div className="panel-card">
              <h3>Add Offering</h3>
            </div>
          )}

          {active === "Tithes" && (
            <div className="panel-card">
              <h3>Add Tithe</h3>
            </div>
          )}

          {active === "Expenses" && (
            <div className="panel-card">
              <h3>Add Expense</h3>
            </div>
          )}

          {active === "Reports" && (
            <div className="panel-card">
              <h3>Reports</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
