import { useMemo, useState } from 'react';
import { useApp } from '../state/AppContext';
import { MONTHS, TODAY } from '../data/content';
import { iso, todayIso, MON_ML, MON_EN_FULL, WD_EN, WD_ML_S } from '../data/dates';
import { malayalamDate } from '../data/panchang';
import { EventRow, TopBar, allEvents } from '../components/ui';

// Months people can browse: this month and the next two (dates are verified up to January).
const MONTH_COUNT = 3;
const monthAt = (offset) => new Date(TODAY.getFullYear(), TODAY.getMonth() + offset, 1);

// "Vrischikam – Dhanu 1202": the Malayalam months a Gregorian month spans.
function malRange(first, L) {
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0);
  const a = malayalamDate(first), b = malayalamDate(last);
  const name = (m) => L(MONTHS[m.month]);
  return a.month === b.month ? `${name(a)} ${a.year}` : `${name(a)} – ${name(b)} ${b.year}`;
}

export default function Calendar() {
  const { t, L, lang, fmtY, family } = useApp();
  const [offset, setOffset] = useState(0);
  const [sel, setSel] = useState(todayIso);
  const first = monthAt(offset);
  const year = first.getFullYear(), month = first.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const byDay = useMemo(() => {
    const m = {};
    allEvents(family).forEach(e => (m[e.d] = m[e.d] || []).push(e));
    return m;
  }, [family]);
  const range = useMemo(() => malRange(first, L), [year, month, lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const list = byDay[sel] || [];

  const cells = [];
  for (let i = 0; i < first.getDay(); i++) cells.push(<div key={'e' + i} className="d empty" />);
  for (let d = 1; d <= days; d++) {
    const k = iso(new Date(year, month, d));
    const kinds = [...new Set((byDay[k] || []).map(e => e.k))];
    cells.push(
      <button key={k} className={`d ${k === todayIso ? 'today' : ''} ${k === sel ? 'sel' : ''}`} onClick={() => setSel(k)} aria-label={k}>
        {d}<div className="dots">{kinds.map(x => <i key={x} style={{ background: `var(--${x})` }} />)}</div>
      </button>
    );
  }

  const go = (n) => {
    const next = Math.max(0, Math.min(MONTH_COUNT - 1, offset + n));
    setOffset(next);
    // Select today in the current month, otherwise the 1st of the month shown.
    setSel(next === 0 ? todayIso : iso(monthAt(next)));
  };

  return (
    <>
      <TopBar title={t('calendar')} settings />
      <div className="pad">
        <div className="cal-head">
          <button className="ib" disabled={offset === 0} onClick={() => go(-1)} aria-label="Previous month">‹</button>
          <div><b>{lang === 'ml' ? MON_ML[month] : MON_EN_FULL[month]} {year}</b><small>{range}</small></div>
          <button className="ib" disabled={offset === MONTH_COUNT - 1} onClick={() => go(1)} aria-label="Next month">›</button>
        </div>
        <div className="grid">
          {(lang === 'ml' ? WD_ML_S : WD_EN.map(x => x[0])).map((w, i) => <div key={i} className="wd">{w}</div>)}
          {cells}
        </div>
        <div className="legend">
          <span><i style={{ background: 'var(--vr)' }} />{t('vrathamL')}</span>
          <span><i style={{ background: 'var(--fest)' }} />{t('festivalL')}</span>
          <span><i style={{ background: 'var(--fam)' }} />{t('familyL')}</span>
        </div>
        <div className="h"><h2>{fmtY(sel)}</h2></div>
        <div className="card">
          {list.length ? list.map((e, i) => <EventRow key={i} e={e} />) : <div className="row"><div className="gr"><span>{t('nothing')}</span></div></div>}
        </div>
      </div>
    </>
  );
}
