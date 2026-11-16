// Shared MongoDB connection for the Vercel functions in /api.
// Files starting with "_" are not exposed as routes by Vercel.
import { MongoClient } from 'mongodb';

const DB_NAME = 'utsavam';

// Reuse one client across warm invocations so we don't open a new
// connection on every request.
let clientPromise = globalThis._utsavamMongo;

export async function getDb() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set');
  if (!clientPromise) {
    clientPromise = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 5,
    }).connect();
    globalThis._utsavamMongo = clientPromise;
  }
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// Real visitor IP. Vercel puts the client IP first in x-forwarded-for.
export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

// Rough device label from the browser's user agent.
export function deviceFrom(ua = '') {
  const os = /android/i.test(ua) ? 'Android'
    : /iphone|ipad|ipod/i.test(ua) ? 'iPhone/iPad'
    : /windows/i.test(ua) ? 'Windows'
    : /mac os/i.test(ua) ? 'Mac'
    : /linux/i.test(ua) ? 'Linux' : 'Other';
  const browser = /edg\//i.test(ua) ? 'Edge'
    : /opr\/|opera/i.test(ua) ? 'Opera'
    : /samsungbrowser/i.test(ua) ? 'Samsung'
    : /chrome|crios/i.test(ua) ? 'Chrome'
    : /firefox|fxios/i.test(ua) ? 'Firefox'
    : /safari/i.test(ua) ? 'Safari' : 'Other';
  const mobile = /mobi|android|iphone|ipad/i.test(ua);
  return `${os} · ${browser}${mobile ? ' · mobile' : ''}`;
}
