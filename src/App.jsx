import React, { useState } from "react";
import "./App.css";
import logo from "../public/logo.jpg"; // keep public/logo.jpg

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "members", label: "Members" },
    { key: "offerings", label: "Offerings" },
    { key: "tithes", label: "Tithes" },
    { key: "expenses", label: "Expenses" },
    { key: "reports", label: "Reports" },
  ];

  function handleNav(key) {
    setActive(key);
    setMobileOpen(false); // close mobile menu after selection
  }

  return (
    <div className="app-root">
      <header className="header-left">
        <div className="header-row">
          <img src={logo} alt="Apostolic Faith Church" className="church-logo" />
          <div className="church-title">
            <h1>Apostolic Faith Church</h1>
            <div className="tagline">Birth.Build.Bless</div>
          </div>

          {/* Hamburger visible on mobile */}
          <button
            className={`hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            title="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile horizontal nav (small pills) */}
        <nav className="mobile-nav">
          {navItems.map((n) => (
            <button
              key={n.key}
              className={`mobile-pill ${active === n.key ? "active" : ""}`}
              onClick={() => handleNav(n.key)}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="app-body">
        {/* Desktop / Tablet sidebar */}
        <aside className={`side-menu ${mobileOpen ? "show-overlay" : ""}`}>
          {navItems.map((n) => (
            <button
              key={n.key}
              className={active === n.key ? "active" : ""}
              onClick={() => handleNav(n.key)}
            >
              {n.label}
            </button>
          ))}
        </aside>

        <main className="main-content">
          <h2>
            {navItems.find((i) => i.key === active)?.label || "Dashboard"}
          </h2>

          {active === "dashboard" && (
            <>
              <p className="muted">Monthly summary for November 2025:</p>

              <div className="dashboard-grid">
                <div className="summary-card members">
                  <h3>Members</h3>
                  <div className="summary-value">0</div>
                </div>

                <div className="summary-card income">
                  <h3>Offerings</h3>
                  <div className="summary-value">₹ 0.00</div>
                </div>

                <div className="summary-card tithes">
                  <h3>Tithes</h3>
                  <div className="summary-value">₹ 0.00</div>
                </div>

                <div className="summary-card expense">
                  <h3>Expenses</h3>
                  <div className="summary-value">₹ 0.00</div>
                </div>

                <div className="summary-card balance">
                  <h3>Balance</h3>
                  <div className="summary-value">₹ 0.00</div>
                </div>
              </div>
            </>
          )}

          {active !== "dashboard" && (
            <div className="panel">
              <h3 style={{ marginTop: 8 }}>{navItems.find(i => i.key===active)?.label}</h3>
              <div className="panel-card">
                <p>This is the <strong>{active}</strong> page placeholder.</p>
                <p>Replace with your forms / lists as before.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
