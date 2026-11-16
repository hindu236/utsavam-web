// Lightweight visitor tracking: app opens, tabs visited and time spent.
// Sends to /api/track (Vercel function). No sign-up needed: each browser gets
// a random visitor id, so the same person opening again counts as 1 visitor
// with 2 opens instead of 2 visitors.

const ENDPOINT = '/api/track';
const PING_EVERY_MS = 15000;

// Only Vercel has the /api backend; skip on GitHub Pages and local dev.
const enabled =
  typeof window !== 'undefined' &&
  !/github\.io$|^localhost$|^127\.|^192\.168\./.test(window.location.hostname) &&
  !navigator.webdriver && // automated/robot browsers
  !/headless/i.test(navigator.userAgent) &&
  !new URLSearchParams(window.location.search).has('notrack');

function makeId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function stored(storage, key) {
  try {
    let id = storage.getItem(key);
    if (!id) { id = makeId(); storage.setItem(key, id); }
    return id;
  } catch {
    return makeId(); // private mode / blocked storage
  }
}

let visitorId;
let sessionId;
let visibleSince = null; // when the app last became visible
let pendingSeconds = 0; // visible time not yet sent
let started = false;
// Later events wait for "start" to be saved, so the first tab isn't lost
// when it would otherwise reach the server before the visitor exists.
let startSaved = Promise.resolve();

function post(body) {
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

function send(payload, { beacon = false } = {}) {
  if (!enabled) return;
  const body = JSON.stringify({ visitorId, sessionId, ...payload });
  try {
    if (payload.type === 'start') {
      startSaved = post(body);
      return;
    }
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      return;
    }
    startSaved.then(() => post(body));
  } catch {
    // never let tracking break the app
  }
}

function collectSeconds() {
  if (visibleSince !== null) {
    pendingSeconds += (Date.now() - visibleSince) / 1000;
    visibleSince = Date.now();
  }
  const whole = Math.floor(pendingSeconds);
  pendingSeconds -= whole;
  return whole;
}

function flush(beacon = false) {
  const seconds = collectSeconds();
  if (seconds > 0) send({ type: 'ping', seconds }, { beacon });
}

/** Call once when the app starts. */
export function startTracking() {
  if (!enabled || started) return;
  started = true;
  visitorId = stored(window.localStorage, 'utsavam_vid');
  sessionId = stored(window.sessionStorage, 'utsavam_sid'); // a refresh is the same visit
  send({ type: 'start' });

  if (document.visibilityState === 'visible') visibleSince = Date.now();
  setInterval(() => { if (document.visibilityState === 'visible') flush(); }, PING_EVERY_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flush(true); // user switched app/tab or closed it
      visibleSince = null;
    } else {
      visibleSince = Date.now();
    }
  });
  window.addEventListener('pagehide', () => flush(true));
}

/** Call when the user moves to a page/tab, e.g. "/calendar". */
export function trackView(path) {
  if (!enabled || !started) return;
  send({ type: 'view', path });
}
