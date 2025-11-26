// src/App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";

/* ========== CONFIG ========== */
const ADMIN_PASSWORD = "afc123";

const PREFIX_OPTIONS = ["", "Mr.", "Mrs.", "Ms.", "Master"];
const OFFERING_TYPES = [
  "",
  "Regular",
  "Mission",
  "Women's meeting",
  "Sunday school",
  "Others",
];
const EXPENSE_CATEGORIES = ["", "Salary", "Maintenance", "Groceries", "Convenience", "Others"];

const MONTH_OPTIONS = [
  { value: "", label: "-- Select --" },
  { value: "1", label: "Jan" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

function getGenderFromPrefix(prefix) {
  if (prefix === "Mr." || prefix === "Master") return "Male";
  if (prefix === "Mrs." || prefix === "Ms.") return "Female";
  return "";
}

function formatDayMonth(day, monthNumber) {
  const d = Number(day);
  const m = Number(monthNumber);
  if (!d || !m) return "";
  const mo = MONTH_OPTIONS.find((x) => Number(x.value) === m);
  return `${String(d).padStart(2, "0")} ${mo ? mo.label : m}`;
}

function isSameMonth(dateString, year, monthIndex) {
  if (!dateString || !year || monthIndex == null) return false;
  const d = new Date(dateString);
  return d.getFullYear() === year && d.getMonth() === monthIndex;
}

function confirmWithPassword() {
  const input = window.prompt("Enter admin password to confirm delete:");
  if (input === null) return false;
  if (input !== ADMIN_PASSWORD) {
    alert("Incorrect password. Action cancelled.");
    return false;
  }
  return true;
}

/* ========== APP ========== */
export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  // data state
  const [members, setMembers] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [tithes, setTithes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // load from localStorage (keeps data when you refresh)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("church_app_data_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        setMembers(parsed.members || []);
        setOfferings(parsed.offerings || []);
        setTithes(parsed.tithes || []);
        setExpenses(parsed.expenses || []);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const payload = { members, offerings, tithes, expenses };
    localStorage.setItem("church_app_data_v1", JSON.stringify(payload));
  }, [members, offerings, tithes, expenses]);

  // ---------- members ----------
  const addMember = (m) => setMembers((p) => [...p, { ...m, id: Date.now().toString() }]);
  const updateMember = (id, data) => setMembers((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
  const deleteMember = (id) => {
    if (!confirmWithPassword()) return;
    setMembers((p) => p.filter((x) => x.id !== id));
    // optionally: remove member references in tithes (we leave old tithe records)
  };

  // ---------- offerings ----------
  const addOffering = (o) => setOfferings((p) => [...p, { ...o, id: Date.now().toString() }]);
  const updateOffering = (id, data) => setOfferings((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
  const deleteOffering = (id) => {
    if (!confirmWithPassword()) return;
    setOfferings((p) => p.filter((x) => x.id !== id));
  };

  // ---------- tithes ----------
  const addTithe = (t) => setTithes((p) => [...p, { ...t, id: Date.now().toString() }]);
  const updateTithe = (id, data) => setTithes((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
  const deleteTithe = (id) => {
    if (!confirmWithPassword()) return;
    setTithes((p) => p.filter((x) => x.id !== id));
  };

  // ---------- expenses ----------
  const addExpense = (e) => setExpenses((p) => [...p, { ...e, id: Date.now().toString() }]);
  const updateExpense = (id, data) => setExpenses((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
  const deleteExpense = (id) => {
    if (!confirmWithPassword()) return;
    setExpenses((p) => p.filter((x) => x.id !== id));
  };

  // render page content
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard members={members} offerings={offerings} tithes={tithes} expenses={expenses} />;
      case "members":
        return <MembersPage members={members} onAdd={addMember} onUpdate={updateMember} onDelete={deleteMember} />;
      case "offerings":
        return <OfferingsPage offerings={offerings} onAdd={addOffering} onUpdate={updateOffering} onDelete={deleteOffering} />;
      case "tithes":
        return <TithesPage members={members} tithes={tithes} onAdd={addTithe} onUpdate={updateTithe} onDelete={deleteTithe} />;
      case "expenses":
        return <ExpensesPage expenses={expenses} onAdd={addExpense} onUpdate={updateExpense} onDelete={deleteExpense} />;
      case "reports":
        return <ReportsPage members={members} offerings={offerings} tithes={tithes} expenses={expenses} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-left">
          <img src="/logo.jpg" alt="Logo" className="church-logo" />
          <div className="church-title">
            <h1 className="church-name">Apostolic Faith Church</h1>
            {/* tagline is inside logo, so keep header clean */}
          </div>
        </div>
      </header>

      <div className="app-body">
        <nav className="side-menu">
          <button className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>Dashboard</button>
          <button className={activePage === "members" ? "active" : ""} onClick={() => setActivePage("members")}>Members</button>
          <button className={activePage === "offerings" ? "active" : ""} onClick={() => setActivePage("offerings")}>Offerings</button>
          <button className={activePage === "tithes" ? "active" : ""} onClick={() => setActivePage("tithes")}>Tithes</button>
          <button className={activePage === "expenses" ? "active" : ""} onClick={() => setActivePage("expenses")}>Expenses</button>
          <button className={activePage === "reports" ? "active" : ""} onClick={() => setActivePage("reports")}>Reports</button>
        </nav>

        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
}

/* ================= PAGES ================= */

function Dashboard({ members, offerings, tithes, expenses }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const totalOfferings = offerings.filter((o) => isSameMonth(o.date, year, month)).reduce((s, o) => s + (o.amount || 0), 0);
  const totalTithes = tithes.filter((t) => isSameMonth(t.date, year, month)).reduce((s, t) => s + (t.amount || 0), 0);
  const totalExpenses = expenses.filter((e) => isSameMonth(e.date, year, month)).reduce((s, e) => s + (e.amount || 0), 0);

  const income = totalOfferings + totalTithes;
  const balance = income - totalExpenses;

  const monthLabel = today.toLocaleString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <p className="monthly-label">Monthly summary for {monthLabel}:</p>

      <div className="dashboard-grid">
        <div className="summary-card members">
          <h3>Members</h3>
          <p className="summary-value">{members.length}</p>
        </div>

        <div className="summary-card income">
          <h3>Offerings</h3>
          <p className="summary-value">₹ {totalOfferings.toFixed(2)}</p>
        </div>

        <div className="summary-card tithes-card">
          <h3>Tithes</h3>
          <p className="summary-value">₹ {totalTithes.toFixed(2)}</p>
        </div>

        <div className="summary-card expense">
          <h3>Expenses</h3>
          <p className="summary-value">₹ {totalExpenses.toFixed(2)}</p>
        </div>

        <div className="summary-card balance">
          <h3>Balance</h3>
          <p className="summary-value">₹ {balance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- MembersPage ---------- */
function MembersPage({ members, onAdd, onUpdate, onDelete }) {
  const [prefix, setPrefix] = useState("");
  const [name, setName] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [annDay, setAnnDay] = useState("");
  const [annMonth, setAnnMonth] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState(null);

  const gender = getGenderFromPrefix(prefix);

  const reset = () => {
    setPrefix(""); setName(""); setDobDay(""); setDobMonth(""); setMobile(""); setAddress("");
    setAnnDay(""); setAnnMonth(""); setNotes(""); setEditingId(null);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) { alert("Name is required"); return; }
    const payload = {
      prefix, name: name.trim(),
      dobDay: dobDay ? parseInt(dobDay, 10) : null,
      dobMonth: dobMonth ? parseInt(dobMonth, 10) : null,
      mobile: mobile.trim() || null, address: address.trim() || null,
      annDay: annDay ? parseInt(annDay, 10) : null,
      annMonth: annMonth ? parseInt(annMonth, 10) : null,
      notes: notes.trim() || null,
    };
    if (editingId) onUpdate(editingId, payload);
    else onAdd(payload);
    reset();
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setPrefix(m.prefix || "");
    setName(m.name || "");
    setDobDay(m.dobDay ? String(m.dobDay) : "");
    setDobMonth(m.dobMonth ? String(m.dobMonth) : "");
    setMobile(m.mobile || "");
    setAddress(m.address || "");
    setAnnDay(m.annDay ? String(m.annDay) : "");
    setAnnMonth(m.annMonth ? String(m.annMonth) : "");
    setNotes(m.notes || "");
  };

  return (
    <div className="members-page">
      <h2>Members</h2>
      <div className="members-layout">
        <form className="member-form" onSubmit={submit}>
          <h3>{editingId ? "Edit Member" : "Add Member"}</h3>

          <label>
            Prefix
            <select value={prefix} onChange={(e) => setPrefix(e.target.value)}>
              {PREFIX_OPTIONS.map((p) => <option key={p} value={p}>{p === "" ? "-- Select --" : p}</option>)}
            </select>
          </label>

          <div className="gender-row"><span>Gender:</span> <strong>{gender || "— (auto from prefix)"}</strong></div>

          <label>
            Name (required)
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Member name" />
          </label>

          <div className="row-two">
            <label>
              DOB Day
              <input type="number" min="1" max="31" value={dobDay} onChange={(e) => setDobDay(e.target.value)} />
            </label>
            <label>
              DOB Month
              <select value={dobMonth} onChange={(e) => setDobMonth(e.target.value)}>
                {MONTH_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </label>
          </div>

          <label>
            Mobile
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Phone number" />
          </label>

          <label>
            Address
            <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>

          <div className="row-two">
            <label>
              Anniversary Day
              <input type="number" min="1" max="31" value={annDay} onChange={(e) => setAnnDay(e.target.value)} />
            </label>
            <label>
              Anniversary Month
              <select value={annMonth} onChange={(e) => setAnnMonth(e.target.value)}>
                {MONTH_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </label>
          </div>

          <label>
            Notes
            <textarea rows="2" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>

          <button className="primary-btn" type="submit">{editingId ? "Update Member" : "Save Member"}</button>
          {editingId && <button type="button" className="secondary-btn" onClick={reset}>Cancel Edit</button>}
        </form>

        <div className="member-list">
          <h3>Member List</h3>
          {members.length === 0 ? <p>No members added yet.</p> : (
            <table>
              <thead><tr><th>Prefix</th><th>Name</th><th>Gender</th><th>DOB</th><th>Mobile</th><th>Anniversary</th><th>Actions</th></tr></thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id}>
                    <td>{m.prefix}</td>
                    <td>{m.name}</td>
                    <td>{getGenderFromPrefix(m.prefix)}</td>
                    <td>{formatDayMonth(m.dobDay, m.dobMonth)}</td>
                    <td>{m.mobile || ""}</td>
                    <td>{formatDayMonth(m.annDay, m.annMonth)}</td>
                    <td className="table-actions">
                      <button className="table-btn edit" onClick={() => startEdit(m)}>Edit</button>
                      <button className="table-btn delete" onClick={() => onDelete(m.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- OfferingsPage ---------- */
function OfferingsPage({ offerings, onAdd, onUpdate, onDelete }) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState(null);

  const reset = () => { setDate(""); setType(""); setAmount(""); setNotes(""); setEditingId(null); };

  const submit = (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date");
    if (!type) return alert("Please select offering type");
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return alert("Enter valid amount");
    const payload = { date, type, amount: amt, notes: notes.trim() || null };
    if (editingId) onUpdate(editingId, payload); else onAdd(payload);
    reset();
  };

  const startEdit = (o) => { setEditingId(o.id); setDate(o.date); setType(o.type); setAmount(String(o.amount)); setNotes(o.notes || ""); };

  return (
    <div className="offerings-page">
      <h2>Offerings</h2>
      <div className="offerings-layout">
        <form className="offering-form" onSubmit={submit}>
          <h3>{editingId ? "Edit Offering" : "Add Offering (total for the day)"}</h3>
          <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label>Offering Type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {OFFERING_TYPES.map((t) => <option key={t} value={t}>{t === "" ? "-- Select --" : t}</option>)}
            </select>
          </label>
          <label>Amount (total collected)<input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
          <label>Notes<textarea rows="2" value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
          <button className="primary-btn" type="submit">{editingId ? "Update Offering" : "Save Offering"}</button>
          {editingId && <button type="button" className="secondary-btn" onClick={reset}>Cancel Edit</button>}
        </form>

        <div className="offering-list">
          <h3>Offerings List</h3>
          {offerings.length === 0 ? <p>No offerings recorded yet.</p> : (
            <table>
              <thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Notes</th><th>Actions</th></tr></thead>
              <tbody>
                {offerings.map((o) => (
                  <tr key={o.id}>
                    <td>{o.date}</td>
                    <td>{o.type}</td>
                    <td>{o.amount.toFixed(2)}</td>
                    <td>{o.notes || ""}</td>
                    <td className="table-actions">
                      <button className="table-btn edit" onClick={() => startEdit(o)}>Edit</button>
                      <button className="table-btn delete" onClick={() => onDelete(o.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- TithesPage ---------- */
function TithesPage({ members, tithes, onAdd, onUpdate, onDelete }) {
  const [date, setDate] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState(null);

  const reset = () => { setDate(""); setIsAnonymous(false); setMemberId(""); setAmount(""); setNotes(""); setEditingId(null); };

  const submit = (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date");
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return alert("Enter valid amount");
    let selectedMember = null;
    if (!isAnonymous) {
      if (!memberId) return alert("Select member or mark anonymous");
      selectedMember = members.find((m) => m.id === memberId) || null;
    }
    const payload = {
      date,
      isAnonymous,
      memberId: selectedMember ? selectedMember.id : null,
      memberName: selectedMember ? selectedMember.name : null,
      amount: amt,
      notes: notes.trim() || null,
    };
    if (editingId) onUpdate(editingId, payload); else onAdd(payload);
    reset();
  };

  const startEdit = (t) => { setEditingId(t.id); setDate(t.date); setIsAnonymous(Boolean(t.isAnonymous)); setMemberId(t.memberId || ""); setAmount(String(t.amount)); setNotes(t.notes || ""); };

  return (
    <div className="tithes-page">
      <h2>Tithes</h2>
      <div className="tithes-layout">
        <form className="tithe-form" onSubmit={submit}>
          <h3>{editingId ? "Edit Tithe" : "Add Tithe"}</h3>
          <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>

          <label className="checkbox-row">
            <input type="checkbox" checked={isAnonymous} onChange={(e) => { setIsAnonymous(e.target.checked); if (e.target.checked) setMemberId(""); }} />
            <span>Anonymous (no name)</span>
          </label>

          {!isAnonymous && (
            <label>Member
              <select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                <option value="">-- Select Member --</option>
                {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </label>
          )}

          <label>Amount<input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
          <label>Notes<textarea rows="2" value={notes} onChange={(e) => setNotes(e.target.value)} /></label>

          <button className="primary-btn" type="submit">{editingId ? "Update Tithe" : "Save Tithe"}</button>
          {editingId && <button type="button" className="secondary-btn" onClick={reset}>Cancel Edit</button>}
        </form>

        <div className="tithe-list">
          <h3>Tithes List</h3>
          {tithes.length === 0 ? <p>No tithes recorded yet.</p> : (
            <table>
              <thead><tr><th>Date</th><th>Member / Anonymous</th><th>Amount</th><th>Notes</th><th>Actions</th></tr></thead>
              <tbody>
                {tithes.map((t) => (
                  <tr key={t.id}>
                    <td>{t.date}</td>
                    <td>{t.isAnonymous ? "Anonymous" : t.memberName || ""}</td>
                    <td>{t.amount.toFixed(2)}</td>
                    <td>{t.notes || ""}</td>
                    <td className="table-actions">
                      <button className="table-btn edit" onClick={() => startEdit(t)}>Edit</button>
                      <button className="table-btn delete" onClick={() => onDelete(t.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- ExpensesPage ---------- */
function ExpensesPage({ expenses, onAdd, onUpdate, onDelete }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [paidTo, setPaidTo] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const reset = () => { setDate(""); setCategory(""); setAmount(""); setPaidTo(""); setDescription(""); setEditingId(null); };

  const submit = (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date");
    if (!category) return alert("Please select category");
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return alert("Enter valid amount");
    const payload = { date, category, amount: amt, paidTo: paidTo.trim() || null, description: description.trim() || null };
    if (editingId) onUpdate(editingId, payload); else onAdd(payload);
    reset();
  };

  const startEdit = (it) => { setEditingId(it.id); setDate(it.date); setCategory(it.category); setAmount(String(it.amount)); setPaidTo(it.paidTo || ""); setDescription(it.description || ""); };

  return (
    <div className="expenses-page">
      <h2>Expenses</h2>
      <div className="expenses-layout">
        <form className="expense-form" onSubmit={submit}>
          <h3>{editingId ? "Edit Expense" : "Add Expense"}</h3>
          <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}>{EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c === "" ? "-- Select --" : c}</option>)}</select></label>
          <label>Amount<input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
          <label>Paid To / Vendor<input value={paidTo} onChange={(e) => setPaidTo(e.target.value)} /></label>
          <label>Description / Notes<textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} /></label>

          <button className="primary-btn" type="submit">{editingId ? "Update Expense" : "Save Expense"}</button>
          {editingId && <button type="button" className="secondary-btn" onClick={reset}>Cancel Edit</button>}
        </form>

        <div className="expense-list">
          <h3>Expenses List</h3>
          {expenses.length === 0 ? <p>No expenses recorded yet.</p> : (
            <table>
              <thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Paid To</th><th>Notes</th><th>Actions</th></tr></thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td>{e.date}</td>
                    <td>{e.category}</td>
                    <td>{e.amount.toFixed(2)}</td>
                    <td>{e.paidTo || ""}</td>
                    <td>{e.description || ""}</td>
                    <td className="table-actions">
                      <button className="table-btn edit" onClick={() => startEdit(e)}>Edit</button>
                      <button className="table-btn delete" onClick={() => onDelete(e.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- ReportsPage ---------- */
function ReportsPage({ members, offerings, tithes, expenses }) {
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const [monthValue, setMonthValue] = useState(defaultMonth);
  const [memberId, setMemberId] = useState("");
  const [fromDate, setFromDate] = useState(defaultMonth + "-01");
  const [toDate, setToDate] = useState(defaultMonth + "-28");

  const [year, monthIndex] = monthValue.split("-").map((v) => parseInt(v || "0", 10));
  const monthIdx = (monthIndex || 1) - 1;

  const monthOfferings = offerings.filter((o) => isSameMonth(o.date, year, monthIdx)).reduce((s, o) => s + (o.amount || 0), 0);
  const monthTithes = tithes.filter((t) => isSameMonth(t.date, year, monthIdx)).reduce((s, t) => s + (t.amount || 0), 0);
  const monthExpenses = expenses.filter((e) => isSameMonth(e.date, year, monthIdx)).reduce((s, e) => s + (e.amount || 0), 0);
  const totalIncome = monthOfferings + monthTithes;
  const balance = totalIncome - monthExpenses;

  const selectedMember = members.find((m) => m.id === memberId) || null;
  const from = fromDate ? new Date(fromDate) : null;
  const to = toDate ? new Date(toDate) : null;

  const memberTitheTotal =
    selectedMember && from && to
      ? tithes
          .filter((t) => {
            if (t.isAnonymous) return false;
            if (t.memberId !== selectedMember.id) return false;
            const d = new Date(t.date);
            return d >= from && d <= to;
          })
          .reduce((s, t) => s + (t.amount || 0), 0)
      : 0;

  return (
    <div className="reports-page">
      <h2>Reports</h2>

      <div className="reports-layout">
        <div className="report-card">
          <h3>Monthly Balance Sheet</h3>
          <div className="report-row">
            <label>Month<input type="month" value={monthValue} onChange={(e) => setMonthValue(e.target.value)} /></label>
          </div>

          <div className="report-summary">
            <div><span>Total Offerings</span><strong>₹ {monthOfferings.toFixed(2)}</strong></div>
            <div><span>Total Tithes</span><strong>₹ {monthTithes.toFixed(2)}</strong></div>
            <div><span>Total Income</span><strong>₹ {totalIncome.toFixed(2)}</strong></div>
            <div><span>Total Expenses</span><strong>₹ {monthExpenses.toFixed(2)}</strong></div>
            <div className="report-balance"><span>Balance</span><strong>₹ {balance.toFixed(2)}</strong></div>
          </div>
        </div>

        <div className="report-card">
          <h3>Tithe by Member (Custom Period)</h3>

          <div className="report-row">
            <label>Member
              <select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                <option value="">-- Select Member --</option>
                {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </label>

            <label>From<input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></label>
            <label>To<input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></label>
          </div>

          <div className="member-tithe-summary">
            {selectedMember ? (
              <>
                <p>Total tithe of <strong>{selectedMember.name}</strong> between <strong>{fromDate}</strong> and <strong>{toDate}</strong>:</p>
                <p className="member-tithe-amount">₹ {memberTitheTotal.toFixed(2)}</p>
              </>
            ) : (
              <p>Please select a member to see tithe total.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
