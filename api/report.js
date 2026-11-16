// GET /report?key=REPORT_KEY            → HTML report (who opened, how often, time, tabs)
// GET /report?key=REPORT_KEY&format=csv → download the visitors table as CSV
//
// Protected by REPORT_KEY because it shows visitors' IP addresses.
import { getDb, isBot } from './_db.js';

const TAB_NAMES = {
  today: 'Today', whatsapp: 'WhatsApp', calendar: 'Calendar', vratham: 'Vratham',
  temples: 'Temples', family: 'Family', videos: 'Videos', settings: 'Settings',
  setup: 'Setup', plans: 'Plans',
};

export default async function handler(req, res) {
  const key = String(req.query.key || '');
  if (!process.env.REPORT_KEY || key !== process.env.REPORT_KEY) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(401).send(page('Report', '<p>Not allowed. Open this page with the report key: <code>/report?key=…</code></p>'));
  }

  try {
    const db = await getDb();
    // Leave out robots saved before bot filtering was added.
    const visitors = (await db.collection('visitors')
      .find({}).sort({ lastSeenAt: -1 }).limit(5000).toArray())
      .filter((v) => !isBot(v.userAgent));
    const sessions = (await db.collection('sessions')
      .find({}).sort({ startedAt: -1 }).limit(400).toArray())
      .filter((x) => !isBot(x.userAgent)).slice(0, 300);

    if (req.query.format === 'csv') return sendCsv(res, visitors);

    const totalVisits = sum(visitors, (v) => v.visits || 0);
    const totalSeconds = sum(visitors, (v) => v.totalSeconds || 0);
    const tabTotals = {};
    for (const v of visitors) {
      for (const [k, n] of Object.entries(v.pageViews || {})) tabTotals[k] = (tabTotals[k] || 0) + n;
    }
    const csvHref = `?key=${encodeURIComponent(key)}&format=csv`;

    const html = `
      <div class="top">
        <h1>Utsavam: visitor report</h1>
        <a class="btn" href="${csvHref}">⬇ Download CSV</a>
      </div>
      <p class="muted">Updated ${fmtDate(new Date())}. One visitor = one phone/browser. Opening the app again adds to that visitor's count.</p>

      <div class="cards">
        ${card('Unique visitors', visitors.length)}
        ${card('Total opens', totalVisits)}
        ${card('Total time in app', fmtDuration(totalSeconds))}
        ${card('Avg time per visitor', fmtDuration(visitors.length ? Math.round(totalSeconds / visitors.length) : 0))}
      </div>

      <h2>Tabs explored</h2>
      ${table(['Tab', 'Views'],
        Object.entries(tabTotals).sort((a, b) => b[1] - a[1])
          .map(([k, n]) => [TAB_NAMES[k] || k, n]))}

      <h2>Visitors (${visitors.length})</h2>
      ${table(['#', 'Visitor', 'IP address(es)', 'Device', 'Times opened', 'Time spent', 'Tabs visited', 'First open', 'Last seen'],
        visitors.map((v, i) => [
          i + 1, v.visitorId.slice(0, 8), (v.ips || []).join(', '), v.device || '',
          v.visits || 0, fmtDuration(v.totalSeconds || 0), tabsText(v.pageViews),
          fmtDate(v.firstSeenAt), fmtDate(v.lastSeenAt),
        ]))}

      <h2>Recent visits (last ${sessions.length})</h2>
      ${table(['Opened at', 'Visitor', 'IP', 'Device', 'Time spent', 'Pages (in order)'],
        sessions.map((s) => [
          fmtDate(s.startedAt), s.visitorId.slice(0, 8), s.ip, s.device || '',
          fmtDuration(s.seconds || 0), (s.pages || []).map((p) => p.path).join(' → '),
        ]))}
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(page('Utsavam report', html));
  } catch (err) {
    console.error('report error', err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send(page('Report', '<p>Could not load the report. Check the database connection.</p>'));
  }
}

function sendCsv(res, visitors) {
  const rows = [['Visitor', 'IP addresses', 'Device', 'Times opened', 'Time spent (seconds)', 'Time spent', 'Tabs visited', 'First open', 'Last seen']];
  for (const v of visitors) {
    rows.push([
      v.visitorId, (v.ips || []).join(' '), v.device || '', v.visits || 0,
      v.totalSeconds || 0, fmtDuration(v.totalSeconds || 0), tabsText(v.pageViews),
      iso(v.firstSeenAt), iso(v.lastSeenAt),
    ]);
  }
  const csv = rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="utsavam-report-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).send('﻿' + csv); // BOM so Excel reads UTF-8
}

const sum = (arr, f) => arr.reduce((a, x) => a + f(x), 0);
const iso = (d) => (d ? new Date(d).toISOString() : '');
const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function tabsText(pageViews = {}) {
  return Object.entries(pageViews).sort((a, b) => b[1] - a[1])
    .map(([k, n]) => `${TAB_NAMES[k] || k} (${n})`).join(', ');
}

function fmtDuration(total) {
  const s = Math.max(0, Math.round(total));
  if (s < 60) return `${s}s`;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  return h ? `${h}h ${m}m` : `${m}m ${r}s`;
}

function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
}

const card = (label, value) => `<div class="card"><div class="v">${esc(value)}</div><div class="l">${esc(label)}</div></div>`;

function table(head, rows) {
  if (!rows.length) return '<p class="muted">No data yet.</p>';
  return `<div class="wrap"><table><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>${esc(title)}</title>
<style>
  :root { --bg:#fff; --fg:#1d1d1f; --muted:#6b6b70; --line:#e5e5ea; --card:#f6f6f8; --accent:#b4532a; }
  @media (prefers-color-scheme: dark) { :root { --bg:#111; --fg:#eee; --muted:#9a9aa0; --line:#2c2c2e; --card:#1c1c1e; --accent:#f08a5d; } }
  body { margin:0; padding:16px; font:14px/1.45 system-ui, sans-serif; background:var(--bg); color:var(--fg); }
  .top { display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between; }
  h1 { font-size:20px; margin:0; } h2 { font-size:16px; margin:24px 0 8px; }
  .muted { color:var(--muted); }
  .btn { background:var(--accent); color:#fff; padding:8px 14px; border-radius:8px; text-decoration:none; font-weight:600; }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; margin-top:12px; }
  .card { background:var(--card); border-radius:10px; padding:12px; }
  .card .v { font-size:22px; font-weight:700; } .card .l { color:var(--muted); font-size:12px; }
  .wrap { overflow-x:auto; border:1px solid var(--line); border-radius:10px; }
  table { border-collapse:collapse; width:100%; min-width:640px; }
  th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { background:var(--card); font-size:12px; color:var(--muted); white-space:nowrap; }
  code { background:var(--card); padding:2px 5px; border-radius:4px; }
</style></head><body>${body}</body></html>`;
}
