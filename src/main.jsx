import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { competitions as bundledCompetitions, statuses } from "./competitions";
import { GOOGLE_SHEET_CSV_URL } from "./config";
import { loadCompetitions } from "./sheet-data";
import "./styles.css";

const academicMonths = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Logo() {
  return <div className="crest" aria-hidden="true"><span>B</span><i>V</i></div>;
}

function Status({ value }) {
  return <span className={`status status-${value.toLowerCase().replaceAll(" ", "-")}`}>{value}</span>;
}

function CompetitionCard({ item }) {
  return (
    <article className="competition-card">
      <div className="card-top">
        <div className="month-tile"><span>{monthNames[item.month].slice(0, 3)}</span><b>{String(item.month).padStart(2, "0")}</b></div>
        <div className="card-title"><Status value={item.status} /><h3>{item.name}</h3></div>
      </div>
      <div className="tags">{item.subjects.map((subject) => <span key={subject}>{subject}</span>)}</div>
      <dl>
        <div><dt>Eligible years</dt><dd>{item.yearGroups.join(", ")}</dd></div>
        <div><dt>Typical timing</dt><dd>{item.registration}</dd></div>
        <div><dt>Deadline / event</dt><dd>{item.deadline}</dd></div>
        <div><dt>BCBV lead</dt><dd>{item.schoolLead} · {item.department}</dd></div>
      </dl>
      <div className="card-footer">
        <span className="verify-dot">Verification required</span>
        {item.officialUrl ? <a href={item.officialUrl} target="_blank" rel="noreferrer">Official website ↗</a> : <span className="url-pending">Official website: add link</span>}
      </div>
    </article>
  );
}

function App() {
  const [competitions, setCompetitions] = useState(bundledCompetitions);
  const [dataState, setDataState] = useState({ source: "loading", message: GOOGLE_SHEET_CSV_URL ? "Refreshing from Google Sheet…" : "Google Sheet not connected" });
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All subjects");
  const [year, setYear] = useState("All year groups");
  const [status, setStatus] = useState("All statuses");
  const [month, setMonth] = useState("All months");
  const [view, setView] = useState("cards");

  useEffect(() => {
    let active = true;
    loadCompetitions(GOOGLE_SHEET_CSV_URL).then((result) => {
      if (active) {
        setCompetitions(result.competitions);
        setDataState({ source: result.source, message: result.message });
      }
    });
    return () => { active = false; };
  }, []);

  const subjects = useMemo(() => [...new Set(competitions.flatMap((item) => item.subjects))].sort(), [competitions]);
  const yearGroups = useMemo(() => [...new Set(competitions.flatMap((item) => item.yearGroups))].sort(), [competitions]);

  const filtered = useMemo(() => competitions.filter((item) => {
    const haystack = `${item.name} ${item.subjects.join(" ")} ${item.department}`.toLowerCase();
    return (!query || haystack.includes(query.toLowerCase()))
      && (subject === "All subjects" || item.subjects.includes(subject))
      && (year === "All year groups" || item.yearGroups.includes(year))
      && (status === "All statuses" || item.status === status)
      && (month === "All months" || item.month === Number(month));
  }), [query, subject, year, status, month]);

  const today = new Date();
  const upcomingMonths = [today.getMonth() + 1, ((today.getMonth() + 1) % 12) + 1];
  const comingUp = competitions.filter((item) => upcomingMonths.includes(item.month)).slice(0, 4);
  const reset = () => { setQuery(""); setSubject("All subjects"); setYear("All year groups"); setStatus("All statuses"); setMonth("All months"); };

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top"><Logo /><span><strong>Brighton College Bangkok</strong><small>Vibhavadi</small></span></a>
          <nav aria-label="Page sections"><a href="#coming-up">Coming up</a><a href="#calendar">Calendar</a><a href="#guidance">Guidance</a></nav>
          <span className="staff-tool">Senior School staff tool</span>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Academic enrichment · 2026–27</p>
          <h1>Find the right<br/><em>challenge.</em></h1>
          <p className="hero-copy">A shared August-to-July view of external academic competitions for BCBV pupils and departments.</p>
          <div className="hero-actions"><a className="button primary" href="#calendar">Explore the calendar</a><a className="button secondary" href="#guidance">How to use this tool</a></div>
        </div>
        <div className="hero-panel" aria-label="Calendar summary">
          <span className="panel-kicker">At a glance</span>
          <strong>{competitions.length}</strong><p>starting opportunities across the academic year</p>
          <div className="panel-rule" />
          <div className="mini-stat"><b>{subjects.length}</b><span>subject areas</span></div>
          <div className="mini-stat"><b>Aug—Jul</b><span>academic-year view</span></div>
        </div>
      </section>

      <section className="data-bar" aria-live="polite"><span className={`data-light ${dataState.source}`} /> <b>{dataState.message}</b><span>Updates appear when the page is refreshed.</span></section>
      <section className="notice" aria-label="Important disclaimer"><b>Please verify before sharing with pupils.</b><span>This calendar records typical timelines from the supplied source. Exact dates, eligibility and entry routes vary by year; always check the official competition website.</span></section>

      <section className="coming" id="coming-up">
        <div className="section-heading"><div><p className="eyebrow dark">Next 30–60 days</p><h2>Coming up</h2></div><p>Typical opportunities for {monthNames[upcomingMonths[0]]} and {monthNames[upcomingMonths[1]]}. Month-level guidance only.</p></div>
        <div className="upcoming-grid">{comingUp.map((item, index) => <article key={item.id} className={index === 0 ? "upcoming featured" : "upcoming"}><span>{monthNames[item.month]}</span><h3>{item.name}</h3><p>{item.phase}</p><small>{item.department}</small></article>)}</div>
      </section>

      <section className="calendar" id="calendar">
        <div className="section-heading"><div><p className="eyebrow dark">Plan the year</p><h2>Competition calendar</h2></div><div className="view-toggle" aria-label="View"><button className={view === "cards" ? "active" : ""} onClick={() => setView("cards")}>Cards</button><button className={view === "months" ? "active" : ""} onClick={() => setView("months")}>By month</button></div></div>
        <div className="filters">
          <label className="search"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search competitions or departments" /></label>
          <label><span>Subject</span><select value={subject} onChange={(event) => setSubject(event.target.value)}><option>All subjects</option>{subjects.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Year group</span><select value={year} onChange={(event) => setYear(event.target.value)}><option>All year groups</option>{yearGroups.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>BCBV status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option>{statuses.map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>
        <div className="month-strip" aria-label="Filter by month"><button className={month === "All months" ? "active" : ""} onClick={() => setMonth("All months")}>All</button>{academicMonths.map((value) => <button className={month === String(value) ? "active" : ""} key={value} onClick={() => setMonth(String(value))}>{monthNames[value].slice(0, 3)}</button>)}</div>
        <div className="results-bar"><p><strong>{filtered.length}</strong> opportunities shown</p>{(query || subject !== "All subjects" || year !== "All year groups" || status !== "All statuses" || month !== "All months") && <button onClick={reset}>Clear filters</button>}</div>
        {filtered.length === 0 ? <div className="empty"><h3>No competitions match these filters.</h3><button onClick={reset}>Reset the calendar</button></div> : view === "cards" ? <div className="card-grid">{filtered.map((item) => <CompetitionCard key={item.id} item={item} />)}</div> : <div className="month-groups">{academicMonths.map((monthNumber) => { const items = filtered.filter((item) => item.month === monthNumber); return items.length ? <section key={monthNumber}><h3><span>{String(monthNumber).padStart(2, "0")}</span>{monthNames[monthNumber]}</h3><div>{items.map((item) => <CompetitionCard key={item.id} item={item} />)}</div></section> : null; })}</div>}
      </section>

      <section className="guidance" id="guidance"><div><p className="eyebrow">Staff guidance</p><h2>A shared view for departmental planning.</h2></div><ol><li><b>Review</b><span>Filter by subject and identify the opportunities worth investigating.</span></li><li><b>Verify</b><span>Confirm dates, fees, eligibility, safeguarding and the official entry route.</span></li><li><b>Update</b><span>Edit the connected Google Sheet, then refresh this page to see approved changes.</span></li></ol></section>

      <footer><div className="brand"><Logo /><span><strong>BCBV Academic Competitions</strong><small>Brighton College Bangkok Vibhavadi</small></span></div><p>Internal planning tool · Dates and details must be verified on official competition websites.</p></footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
