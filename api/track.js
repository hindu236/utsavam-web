// POST /api/track — records app opens, page/tab views and time spent.
//
// Body: { visitorId, sessionId, type, path?, seconds? }
//   type "start" → the app was opened (once per browser tab)
//   type "view"  → the user moved to a page/tab (path, e.g. "/calendar")
//   type "ping"  → time spent since the last ping (seconds), sent while visible
//
// One visitor = one browser/device (random id kept in localStorage), so
// opening the app again counts as the same person with visits + 1.
import { clientIp, deviceFrom, getDb, isBot } from './_db.js';

const MAX_PING_SECONDS = 60; // ignore bogus/huge time jumps
const ID_RE = /^[a-zA-Z0-9-]{8,64}$/;

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return {}; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const { visitorId, sessionId, type, path, seconds } = readBody(req);
  if (!ID_RE.test(visitorId || '') || !ID_RE.test(sessionId || '')) {
    return res.status(400).json({ ok: false, error: 'bad id' });
  }

  const ua = String(req.headers['user-agent'] || '').slice(0, 300);
  // Don't count robots (e.g. Vercel's deploy screenshot browser).
  if (isBot(ua)) return res.status(200).json({ ok: true, skipped: 'bot' });

  const now = new Date();
  const ip = clientIp(req);
  const page = typeof path === 'string' ? path.slice(0, 100) || '/' : null;

  try {
    const db = await getDb();
    const visitors = db.collection('visitors');
    const sessions = db.collection('sessions');

    if (type === 'start') {
      // Count the open once per session, even if "start" is sent twice.
      const created = await sessions.updateOne(
        { sessionId },
        {
          $setOnInsert: {
            sessionId, visitorId, ip, userAgent: ua, device: deviceFrom(ua),
            startedAt: now, seconds: 0, pages: [],
          },
          $set: { lastSeenAt: now },
        },
        { upsert: true }
      );
      const isNewSession = created.upsertedCount === 1;
      await visitors.updateOne(
        { visitorId },
        {
          $setOnInsert: { visitorId, firstSeenAt: now, totalSeconds: 0 },
          $set: { lastSeenAt: now, userAgent: ua, device: deviceFrom(ua), lastIp: ip },
          $addToSet: { ips: ip },
          $inc: { visits: isNewSession ? 1 : 0 },
        },
        { upsert: true }
      );
    } else if (type === 'view' && page) {
      await sessions.updateOne(
        { sessionId, visitorId },
        { $push: { pages: { path: page, at: now } }, $set: { lastSeenAt: now } }
      );
      await visitors.updateOne(
        { visitorId },
        { $inc: { [`pageViews.${pageKey(page)}`]: 1 }, $set: { lastSeenAt: now } }
      );
    } else if (type === 'ping') {
      const s = Math.max(0, Math.min(MAX_PING_SECONDS, Math.round(Number(seconds) || 0)));
      if (s > 0) {
        await sessions.updateOne(
          { sessionId, visitorId },
          { $inc: { seconds: s }, $set: { lastSeenAt: now } }
        );
        await visitors.updateOne(
          { visitorId },
          { $inc: { totalSeconds: s }, $set: { lastSeenAt: now } }
        );
      }
    } else {
      return res.status(400).json({ ok: false, error: 'bad type' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('track error', err);
    return res.status(500).json({ ok: false });
  }
}

// "/temples/guruvayur" → "temples" so the report groups by tab.
// Mongo field names can't contain "." or start with "$".
function pageKey(path) {
  const first = path.split('/').filter(Boolean)[0] || 'today';
  return first.replace(/[.$]/g, '_');
}
