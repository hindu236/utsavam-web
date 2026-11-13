import { useState } from 'react';
import { useApp } from '../state/AppContext';
import { iso, todayIso, MON_ML, MON_EN_FULL, WD_EN, WD_ML_S } from '../data/dates';
import { EventRow, TopBar, allEvents } from '../components/ui';

const MAL_RANGE = { 10: ['Thulam – Vrischikam 1202', 'തുലാം – വൃശ്ചികം 1202'], 11: ['Vrischikam – Dhanu 1202', 'വൃശ്ചികം – ധനു 1202'] };

export default function Calendar() {
  const { t, L, lang, fmtY, family } = useApp();
  const [month, setMonth] = useState(10); // demo shows Nov–Dec 2026
  const [sel, setSel] = useState(todayIso);
  const year = 2026;
  const first = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  const byDay = {};
  allEvents(family).forEach(e => (byDay[e.d] = byDay[e.d] || []).push(e));
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

  return (
    <>
      <TopBar title={t('calendar')} settings />
      <div className="pad">
        <div className="cal-head">
          <button className="ib" disabled={month === 10} onClick={() => setMonth(10)} aria-label="Previous month">‹</button>
          <div><b>{lang === 'ml' ? MON_ML[month] : MON_EN_FULL[month]} {year}</b><small>{L(MAL_RANGE[month])}</small></div>
          <button className="ib" disabled={month === 11} onClick={() => setMonth(11)} aria-label="Next month">›</button>
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
