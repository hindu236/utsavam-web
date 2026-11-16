// GET /report?key=REPORT_KEY  → HTML report (who opened, how often, time, tabs)
//
// Query options (all optional, kept when you click around):
//   range=today|yesterday|7d|30d|all   quick date range (default: all)
//   from=YYYY-MM-DD&to=YYYY-MM-DD      custom range (India time); overrides range
//   sort=<column>&dir=asc|desc         sort the visitors table
//   format=csv                         download the visitors table (filtered + sorted)
//   format=visits-csv                  download every visit (filtered)
//
// All numbers are counted from visits inside the chosen dates.
// Protected by REPORT_KEY because it shows visitors' IP addresses.
import { getDb, isBot } from './_db.js';

const TAB_NAMES = {
  today: 'Today', whatsapp: 'WhatsApp', calendar: 'Calendar', vratham: 'Vratham',
  temples: 'Temples', family: 'Family', videos: 'Videos', settings: 'Settings',
  setup: 'Setup', plans: 'Plans',
};
const IST_MS = 5.5 * 3600000;
const DAY_MS = 86400000;
const RANGES = [['today', 'Today'], ['yesterday', 'Yesterday'], ['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['all', 'All time']];

// Sortable visitor columns: key → [label, value getter]
const COLUMNS = {
  visitor: ['Visitor', (v) => v.visitorId],
  ip: ['IP address(es)', (v) => v.ips.join(', ')],
  device: ['Device', (v) => v.device],
  opens: ['Times opened', (v) => v.opens],
  time: ['Time spent', (v) => v.seconds],
  tabs: ['Tabs visited', (v) => v.tabCount],
  first: ['First open', (v) => v.firstAt.getTime()],
  last: ['Last seen', (v) => v.lastAt.getTime()],
};

export default async function handler(req, res) {
  const q = req.query || {};
  const key = String(q.key || '');
  if (!process.env.REPORT_KEY || key !== process.env.REPORT_KEY) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(401).send(page('Report', '<p>Not allowed. Open this page with the report key: <code>/report?key=…</code></p>'));
  }

  const win = dateWindow(q);
  const sort = COLUMNS[q.sort] ? q.sort : 'last';
  const dir = q.dir === 'asc' ? 'asc' : 'desc';

  try {
    const db = await getDb();
    const match = {};
    if (win.start || win.end) {
      match.startedAt = {};
      if (win.start) match.startedAt.$gte = win.start;
      if (win.end) match.startedAt.$lt = win.end;
    }
    // Leave out robots saved before bot filtering was added.
    const sessions = (await db.collection('sessions')
      .find(match).sort({ startedAt: -1 }).limit(20000).toArray())
      .filter((s) => !isBot(s.userAgent));

    const visitors = summarise(sessions);
    const getter = COLUMNS[sort][1];
    visitors.sort((a, b) => {
      const x = getter(a), y = getter(b);
      const c = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
      return dir === 'asc' ? c : -c;
    });

    const stamp = `${win.label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${todayIst()}`;
    if (q.format === 'csv') return sendCsv(res, visitorRows(visitors), `utsavam-visitors-${stamp}.csv`);
    if (q.format === 'visits-csv') return sendCsv(res, visitRows(sessions), `utsavam-visits-${stamp}.csv`);

    const totalOpens = sessions.length;
    const totalSeconds = sum(sessions, (s) => s.seconds || 0);
    const tabTotals = {};
    for (const v of visitors) for (const [k, n] of Object.entries(v.tabs)) tabTotals[k] = (tabTotals[k] || 0) + n;

    // Keep the current filter when linking (sort headers, downloads, range buttons).
    const base = { key, range: win.range, from: q.from, to: q.to, sort, dir };
    const link = (over) => '?' + new URLSearchParams(
      Object.entries({ ...base, ...over }).filter(([, v]) => v !== undefined && v !== '')
    ).toString();
    const sortLink = (col) => link({ sort: col, dir: sort === col && dir === 'desc' ? 'asc' : 'desc' });
    const arrow = (col) => (sort === col ? (dir === 'desc' ? ' ▼' : ' ▲') : '');

    const html = `
      <div class="top">
        <h1>Utsavam: visitor report</h1>
        <div class="dl">
          <a class="btn" href="${esc(link({ format: 'csv' }))}">⬇ Visitors CSV</a>
          <a class="btn alt" href="${esc(link({ format: 'visits-csv' }))}">⬇ All visits CSV</a>
        </div>
      </div>

      <form class="filters" method="get">
        <input type="hidden" name="key" value="${esc(key)}">
        <input type="hidden" name="sort" value="${esc(sort)}">
        <input type="hidden" name="dir" value="${esc(dir)}">
        <div class="chips">
          ${RANGES.map(([r, label]) => `<a class="chip ${!q.from && !q.to && win.range === r ? 'on' : ''}" href="${esc(link({ range: r, from: '', to: '' }))}">${label}</a>`).join('')}
        </div>
        <div class="custom">
          <label>From <input type="date" name="from" value="${esc(q.from || '')}"></label>
          <label>To <input type="date" name="to" value="${esc(q.to || '')}"></label>
          <button type="submit">Apply</button>
        </div>
      </form>
      <p class="muted">Showing <b>${esc(win.label)}</b> (India time) · updated ${fmtDate(new Date())}. One visitor = one phone/browser; opening the app again adds to that visitor's count.</p>

      <div class="cards">
        ${card('Unique visitors', visitors.length)}
        ${card('Total opens', totalOpens)}
        ${card('Total time in app', fmtDuration(totalSeconds))}
        ${card('Avg time per visitor', fmtDuration(visitors.length ? Math.round(totalSeconds / visitors.length) : 0))}
      </div>

      <h2>Tabs explored</h2>
      ${table(['Tab', 'Views'],
        Object.entries(tabTotals).sort((a, b) => b[1] - a[1]).map(([k, n]) => [TAB_NAMES[k] || k, n]))}

      <h2>Visitors (${visitors.length}) <span class="muted small">· tap a column to sort</span></h2>
      ${table(
        ['#', ...Object.entries(COLUMNS).map(([col, [label]]) => ({ html: `<a href="${esc(sortLink(col))}">${esc(label)}${arrow(col)}</a>` }))],
        visitors.map((v, i) => [
          i + 1, v.visitorId.slice(0, 8), v.ips.join(', '), v.device, v.opens,
          fmtDuration(v.seconds), tabsText(v.tabs), fmtDate(v.firstAt), fmtDate(v.lastAt),
        ]))}

      <h2>Visits (${Math.min(sessions.length, 300)} of ${sessions.length}, newest first)</h2>
      ${table(['Opened at', 'Visitor', 'IP', 'Device', 'Time spent', 'Pages (in order)'],
        sessions.slice(0, 300).map((s) => [
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

// Start/end (UTC Date) of the chosen India-time date range.
function dateWindow(q) {
  const day = (s) => (/^\d{4}-\d{2}-\d{2}$/.test(s || '') ? new Date(Date.parse(`${s}T00:00:00Z`) - IST_MS) : null);
  const from = day(q.from), to = day(q.to);
  if (from || to) {
    return {
      range: 'custom', start: from, end: to ? new Date(to.getTime() + DAY_MS) : null,
      label: `${q.from || 'start'} to ${q.to || 'now'}`,
    };
  }
  const startOfToday = new Date(Date.parse(`${todayIst()}T00:00:00Z`) - IST_MS);
  const range = RANGES.some(([r]) => r === q.range) ? q.range : 'all';
  const back = (n) => new Date(startOfToday.getTime() - n * DAY_MS);
  if (range === 'today') return { range, start: startOfToday, end: null, label: 'Today' };
  if (range === 'yesterday') return { range, start: back(1), end: startOfToday, label: 'Yesterday' };
  if (range === '7d') return { range, start: back(6), end: null, label: 'Last 7 days' };
  if (range === '30d') return { range, start: back(29), end: null, label: 'Last 30 days' };
  return { range: 'all', start: null, end: null, label: 'All time' };
}

const todayIst = () => new Date(Date.now() + IST_MS).toISOString().slice(0, 10);

// One row per visitor, counted only from the visits in range.
function summarise(sessions) {
  const map = new Map();
  for (const s of sessions) {
    let v = map.get(s.visitorId);
    if (!v) {
      v = { visitorId: s.visitorId, ips: new Set(), device: s.device || '', opens: 0, seconds: 0, tabs: {}, firstAt: s.startedAt, lastAt: s.lastSeenAt || s.startedAt };
      map.set(s.visitorId, v);
    }
    v.ips.add(s.ip);
    v.opens += 1;
    v.seconds += s.seconds || 0;
    for (const p of s.pages || []) {
      const k = pageKey(p.path);
      v.tabs[k] = (v.tabs[k] || 0) + 1;
    }
    if (s.startedAt < v.firstAt) v.firstAt = s.startedAt;
    const last = s.lastSeenAt || s.startedAt;
    if (last > v.lastAt) v.lastAt = last;
  }
  return [...map.values()].map((v) => ({
    ...v, ips: [...v.ips], tabCount: Object.values(v.tabs).reduce((a, n) => a + n, 0),
  }));
}

function pageKey(path = '/') {
  return (path.split('/').filter(Boolean)[0] || 'today').replace(/[.$]/g, '_');
}

function visitorRows(visitors) {
  return [
    ['Visitor', 'IP addresses', 'Device', 'Times opened', 'Time spent (seconds)', 'Time spent', 'Tabs visited', 'First open (IST)', 'Last seen (IST)'],
    ...visitors.map((v) => [
      v.visitorId, v.ips.join(' '), v.device, v.opens, v.seconds, fmtDuration(v.seconds),
      tabsText(v.tabs), fmtDate(v.firstAt), fmtDate(v.lastAt),
    ]),
  ];
}

function visitRows(sessions) {
  return [
    ['Opened at (IST)', 'Visitor', 'IP', 'Device', 'Time spent (seconds)', 'Time spent', 'Pages (in order)'],
    ...sessions.map((s) => [
      fmtDate(s.startedAt), s.visitorId, s.ip, s.device || '', s.seconds || 0,
      fmtDuration(s.seconds || 0), (s.pages || []).map((p) => p.path).join(' > '),
    ]),
  ];
}

function sendCsv(res, rows, filename) {
  const csv = rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).send('﻿' + csv); // BOM so Excel reads UTF-8
}

const sum = (arr, f) => arr.reduce((a, x) => a + f(x), 0);
const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function tabsText(tabs = {}) {
  return Object.entries(tabs).sort((a, b) => b[1] - a[1])
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

// Header cells may be { html } for links; everything else is escaped text.
function table(head, rows) {
  if (!rows.length) return '<p class="muted">No visits in this date range.</p>';
  const th = (h) => `<th>${typeof h === 'object' ? h.html : esc(h)}</th>`;
  return `<div class="wrap"><table><thead><tr>${head.map(th).join('')}</tr></thead>
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
  .dl { display:flex; flex-wrap:wrap; gap:8px; }
  h1 { font-size:20px; margin:0; } h2 { font-size:16px; margin:24px 0 8px; }
  .muted { color:var(--muted); } .small { font-size:12px; font-weight:400; }
  .btn { background:var(--accent); color:#fff; padding:8px 14px; border-radius:8px; text-decoration:none; font-weight:600; }
  .btn.alt { background:transparent; color:var(--accent); border:1px solid var(--accent); }
  .filters { margin:14px 0 4px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
  .chips { display:flex; flex-wrap:wrap; gap:6px; }
  .chip { padding:6px 12px; border-radius:999px; border:1px solid var(--line); color:var(--fg); text-decoration:none; }
  .chip.on { background:var(--accent); border-color:var(--accent); color:#fff; }
  .custom { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
  .custom input, .custom button { font:inherit; padding:5px 8px; border-radius:8px; border:1px solid var(--line); background:var(--bg); color:var(--fg); }
  .custom button { background:var(--accent); color:#fff; border-color:var(--accent); cursor:pointer; }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; margin-top:12px; }
  .card { background:var(--card); border-radius:10px; padding:12px; }
  .card .v { font-size:22px; font-weight:700; } .card .l { color:var(--muted); font-size:12px; }
  .wrap { overflow-x:auto; border:1px solid var(--line); border-radius:10px; }
  table { border-collapse:collapse; width:100%; min-width:640px; }
  th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { background:var(--card); font-size:12px; color:var(--muted); white-space:nowrap; }
  th a { color:inherit; text-decoration:none; } th a:hover { color:var(--accent); }
  code { background:var(--card); padding:2px 5px; border-radius:4px; }
</style></head><body>${body}</body></html>`;
}
