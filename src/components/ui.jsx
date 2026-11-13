import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { CAL, VR, tempById } from '../data/content';
import { googleCalendar } from '../data/dates';

/** Go back inside the app; if the page was opened directly, go to a fallback route. */
export function useBack(fallback = '/') {
  const navigate = useNavigate();
  return () => (window.history.state && window.history.state.idx > 0 ? navigate(-1) : navigate(fallback, { replace: true }));
}

export function LangToggle() {
  const { lang, setLang } = useApp();
  return (
    <div className="lang" role="group" aria-label="Language">
      <button className={lang === 'ml' ? 'on' : ''} onClick={() => setLang('ml')}>മല</button>
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
    </div>
  );
}

export function TopBar({ title, back, fallback = '/', settings }) {
  const { t } = useApp();
  const goBack = useBack(fallback);
  const navigate = useNavigate();
  return (
    <header className="topbar">
      {back && <button className="ib" onClick={goBack} aria-label={t('back')}>←</button>}
      <h1>{title}</h1>
      <LangToggle />
      {settings && <button className="ib" onClick={() => navigate('/settings')} aria-label={t('settings')}>⚙️</button>}
    </header>
  );
}

export function Hero({ c1, c2, emoji, kicker, title, children, fallback }) {
  const goBack = useBack(fallback);
  const { t } = useApp();
  return (
    <section className="hero" style={{ '--c1': c1, '--c2': c2 }}>
      <div className="bar"><button className="ib" onClick={goBack} aria-label={t('back')}>←</button><LangToggle /></div>
      <div className="em">{emoji}</div>
      <div className="k">{kicker}</div>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

const TABS = [['/', '🏠', 'today'], ['/calendar', '📅', 'calendar'], ['/family', '👪', 'family'], ['/temples', '🛕', 'temples'], ['/videos', '▶️', 'videos']];
export function TabBar() {
  const { t } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = pathname.startsWith('/vratham') ? '/calendar'
    : pathname.startsWith('/setup') ? '/family'
    : TABS.slice(1).find(([p]) => pathname.startsWith(p))?.[0] || '/';
  return (
    <nav className="tabbar">
      {TABS.map(([p, icon, k]) => (
        <button key={p} className={active === p ? 'on' : ''} onClick={() => navigate(p)} aria-current={active === p ? 'page' : undefined}>
          <span className="ti" aria-hidden="true">{icon}</span>{t(k)}
        </button>
      ))}
    </nav>
  );
}

export function SheetHost() {
  const { sheet, closeSheet } = useApp();
  if (!sheet) return null;
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && closeSheet()}>
      <div className="sheet" role="dialog" aria-modal="true"><div className="grab" />{sheet}</div>
    </div>
  );
}

export function Toast() {
  const { toastMsg } = useApp();
  return toastMsg ? <div className="toast" role="status">{toastMsg}</div> : null;
}

/** One row in an event list (vratham, temple festival or family day). */
export function EventRow({ e }) {
  const { t, L, rel, fmt, family } = useApp();
  const navigate = useNavigate();
  let ic, title, sub, to, tag;
  if (e.k === 'fam') {
    const f = family[e.i];
    ic = f.type === 'p' ? '🎂' : '🪷';
    title = `${L(f.name)} · ${f.type === 'p' ? t('pirannal') : t('sraddham')}`;
    sub = fmt(e.d); to = '/family';
    tag = <span className="tag fam">{t('familyL')}</span>;
  } else if (e.k === 'vr') {
    ic = VR[e.id].emoji; title = e.name ? L(e.name) : L(VR[e.id].name); sub = fmt(e.d);
    to = `/vratham/${e.id}/${e.d}`; tag = <span className="tag vr">{t('vrathamL')}</span>;
  } else {
    const tp = tempById(e.id);
    ic = tp.emoji; title = e.name ? L(e.name) : `${L(tp.fest)} · ${L(tp.place)}`; sub = L(tp.name); to = `/temples/${e.id}`;
    tag = tp.featured && !e.name ? <span className="tag feat">{t('featured')}</span> : <span className="tag fest">{t('festivalL')}</span>;
  }
  return (
    <button className="row" onClick={() => navigate(to)}>
      <div className="ic">{ic}</div>
      <div className="gr"><b>{title}</b><span>{sub}</span>{tag}</div>
      <div className="when">{rel(e.d)}</div>
    </button>
  );
}

export function allEvents(family) {
  return [...CAL, ...family.map((f, i) => ({ d: f.next, k: 'fam', i }))].sort((a, b) => a.d.localeCompare(b.d));
}

/** Bottom sheet: choose how to be reminded. */
export function RemindSheet({ remKey, title, date }) {
  const { t, reminded, toggleReminder, closeSheet, toast } = useApp();
  const on = reminded.includes(remKey);
  return (
    <>
      <h3>{t('howRemind')}</h3>
      <Opt icon="💬" title={t('viaWa')} sub={t('viaWaSub')} defaultOn />
      <a className="opt" href={googleCalendar(title, date)} target="_blank" rel="noopener noreferrer" onClick={() => toast(t('gcalOpen'))}>
        <div className="oi">📆</div><div><b>{t('viaGcal')}</b><span>{t('viaGcalSub')}</span></div><div className="tick">↗</div>
      </a>
      <Opt icon="📱" title={t('viaApp')} sub={t('viaAppSub')} defaultOn />
      <button className="btn p" style={{ marginTop: '.4rem' }} onClick={() => { if (!on) toggleReminder(remKey); closeSheet(); toast(t('remSaved')); }}>{t('save')}</button>
      {on && <button className="btn w" style={{ marginTop: '.5rem' }} onClick={() => { toggleReminder(remKey); closeSheet(); toast(t('remOff')); }}>{t('removeRem')}</button>}
    </>
  );
}

/** Large tappable option with a tick, used in sheets and forms. */
export function Opt({ icon, title, sub, defaultOn = false, on: controlled, onToggle }) {
  const [local, setLocal] = useState(defaultOn);
  const on = controlled ?? local;
  return (
    <button className={`opt ${on ? 'on' : ''}`} onClick={() => (onToggle ? onToggle() : setLocal(v => !v))} aria-pressed={on}>
      <div className="oi">{icon}</div>
      <div><b>{title}</b>{sub && <span>{sub}</span>}</div>
      <div className="tick">✓</div>
    </button>
  );
}
