import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { T } from '../data/i18n';
import { DEFAULT_FAMILY } from '../data/content';
import { fmt, fmtY, diff, nextFamilyDate } from '../data/dates';

const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

// Saved on this device only (per browser). Wrapped in try/catch for private mode.
const KEY = 'utsavam.v1.';
const load = (k, d) => { try { const v = localStorage.getItem(KEY + k); return v ? JSON.parse(v) : d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch { /* ignore */ } };

const DEFAULTS = {
  lang: 'ml', size: 18, plan: 'free',
  family: DEFAULT_FAMILY,
  reminded: [],
  followed: ['guruvayur'],
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => load('lang', DEFAULTS.lang));
  const [size, setSize] = useState(() => load('size', DEFAULTS.size));
  const [plan, setPlan] = useState(() => load('plan', DEFAULTS.plan));
  // Recalculate each family day's next date from its star and month, so it is
  // always the real upcoming date (also fixes dates saved by the old demo).
  const [family, setFamily] = useState(() =>
    load('family', DEFAULTS.family).map(f => ({ ...f, next: nextFamilyDate(f.star, f.month) })));
  const [reminded, setReminded] = useState(() => load('reminded', DEFAULTS.reminded));
  const [followed, setFollowed] = useState(() => load('followed', DEFAULTS.followed));
  const [sheet, setSheet] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const timer = useRef();

  useEffect(() => { save('lang', lang); document.documentElement.lang = lang; document.body.classList.toggle('ml', lang === 'ml'); }, [lang]);
  useEffect(() => { save('size', size); document.documentElement.style.fontSize = size + 'px'; }, [size]);
  useEffect(() => save('plan', plan), [plan]);
  useEffect(() => save('family', family), [family]);
  useEffect(() => save('reminded', reminded), [reminded]);
  useEffect(() => save('followed', followed), [followed]);

  const toast = useCallback(msg => {
    setToastMsg(msg); clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(null), 2800);
  }, []);

  const value = useMemo(() => {
    const i = lang === 'ml' ? 1 : 0;
    const t = (k, vars) => { let s = T[k] ? T[k][i] : k; if (vars) for (const v in vars) s = s.replace(`{${v}}`, vars[v]); return s; };
    const L = a => (Array.isArray(a) ? a[i] : a);
    const rel = s => { const n = diff(s); return n === 0 ? t('todayW') : n === 1 ? t('tomorrow') : n < 0 ? t('ago', { n: -n }) : t('inDays', { n }); };
    const toggleIn = (setter) => id => setter(list => (list.includes(id) ? list.filter(x => x !== id) : [...list, id]));
    return {
      lang, setLang, size, setSize, plan, setPlan, family, setFamily,
      reminded, toggleReminder: toggleIn(setReminded), followed, toggleFollow: toggleIn(setFollowed),
      t, L, rel, fmt: s => fmt(s, lang), fmtY: s => fmtY(s, lang),
      sheet, openSheet: setSheet, closeSheet: () => setSheet(null),
      toastMsg, toast,
      resetDemo: () => {
        setPlan(DEFAULTS.plan); setFamily(DEFAULTS.family.map(f => ({ ...f, next: nextFamilyDate(f.star, f.month) }))); setReminded(DEFAULTS.reminded); setFollowed(DEFAULTS.followed);
      },
    };
  }, [lang, size, plan, family, reminded, followed, sheet, toastMsg, toast]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
