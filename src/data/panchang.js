// Real Malayalam date and nakshatra (star), calculated from the sun and moon
// positions for Chengannur. Replaces the old fixed demo date.
//
// Rules used (common Kerala practice):
// - Malayalam month starts on the day the sun enters the next sidereal sign,
//   if that happens before about 3/5 of the daytime; otherwise the next day.
// - The star of a day is the one in force 6 nazhika (2h 24m) after sunrise.
// Sidereal positions use the Lahiri ayanamsa.
import * as Astronomy from 'astronomy-engine';

const OBSERVER = new Astronomy.Observer(9.318, 76.611, 10); // Chengannur
const STAR_SPAN = 360 / 27;

// Lahiri ayanamsa in degrees (23.857° at J2000, +50.29"/year)
function ayanamsa(date) {
  const years = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / (365.25 * 86400000);
  return 23.857 + years * 0.013969;
}
const norm = (x) => ((x % 360) + 360) % 360;
const moonSidereal = (date) => norm(Astronomy.EclipticGeoMoon(date).lon - ayanamsa(date));
const sunSidereal = (date) => norm(Astronomy.SunPosition(date).elon - ayanamsa(date));

// Local calendar day (midnight) for a "YYYY-MM-DD" or Date in the user's timezone.
const dayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Sunrise/sunset at Chengannur for that calendar day (IST), with a safe fallback.
function sunTimes(day) {
  // Search from 00:00 IST of that date.
  const istMidnight = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()) - 5.5 * 3600000);
  const rise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, OBSERVER, +1, istMidnight, 1);
  const set = rise && Astronomy.SearchRiseSet(Astronomy.Body.Sun, OBSERVER, -1, rise.date, 1);
  const r = rise ? rise.date : new Date(istMidnight.getTime() + 6.33 * 3600000);
  const s = set ? set.date : new Date(istMidnight.getTime() + 18.2 * 3600000);
  return { rise: r, set: s };
}

/** Star index (0 = Ashwathi … 26 = Revathi) for a calendar day. */
export function starOfDay(d) {
  const { rise } = sunTimes(dayStart(d));
  const t = new Date(rise.getTime() + 144 * 60000); // sunrise + 6 nazhika
  return Math.floor(moonSidereal(t) / STAR_SPAN);
}

// Sidereal sign (0 = Mesham … 11 = Meenam) at the month-start cut-off time of a day.
function signAtCutoff(day) {
  const { rise, set } = sunTimes(day);
  const t = new Date(rise.getTime() + 0.6 * (set - rise));
  return Math.floor(sunSidereal(t) / 30);
}

// MONTHS in content.js start at Chingam (= Simham, sign 4).
const monthIndexFromSign = (sign) => (sign - 4 + 12) % 12;

/**
 * Malayalam date for a calendar day.
 * Returns { month: 0-11 (0 = Chingam), day: 1-32, year: Kollavarsham }.
 */
export function malayalamDate(d) {
  const day = dayStart(d);
  const sign = signAtCutoff(day);
  // Walk back to the first day of this month.
  let n = 1;
  const probe = new Date(day);
  while (n < 33) {
    probe.setDate(probe.getDate() - 1);
    if (signAtCutoff(probe) !== sign) break;
    n += 1;
  }
  const month = monthIndexFromSign(sign);
  return { month, day: n, year: kollavarsham(day, month) };
}

// Kollavarsham year starts on Chingam 1 (mid-August):
// Chingam..Dhanu in Aug–Dec → Gregorian year − 824;
// Dhanu in January and Makaram..Karkidakam → Gregorian year − 825.
function kollavarsham(day, month) {
  const g = day.getFullYear();
  return day.getMonth() >= 7 && month <= 4 ? g - 824 : g - 825;
}

/**
 * Next date (on or after `from`) when `star` falls in Malayalam `month`.
 * Used for family birthday-star and remembrance days. Returns "YYYY-MM-DD".
 */
export function nextStarInMonth(star, month, from = new Date()) {
  const d = dayStart(from);
  for (let i = 0; i < 400; i += 1) {
    if (malayalamDateFast(d).month === month && starOfDay(d) === star) return toIso(d);
    d.setDate(d.getDate() + 1);
  }
  return toIso(dayStart(from));
}

// Cheaper month check for scanning (only needs the month, not the day number).
const malayalamDateFast = (d) => ({ month: monthIndexFromSign(signAtCutoff(d)) });

const toIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Tithi (1-30; 1-15 waxing, 16-30 waning) in force at a given moment. */
export function tithiAt(date) {
  const elong = norm(Astronomy.EclipticGeoMoon(date).lon - Astronomy.SunPosition(date).elon);
  return Math.floor(elong / 12) + 1;
}

/** Tithi at sunrise and at sunset for a calendar day. */
export function tithiOfDay(d) {
  const { rise, set } = sunTimes(dayStart(d));
  return { sunrise: tithiAt(rise), sunset: tithiAt(set) };
}
