import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { CAL, TEMPLES } from '../data/content';
import { diff } from '../data/dates';
import { EventRow, LangToggle } from '../components/ui';

export default function Today() {
  const { t, L, family, plan } = useApp();
  const navigate = useNavigate();
  const upcoming = CAL.filter(e => diff(e.d) >= 0 && diff(e.d) <= 16).slice(0, 5);
  const famDays = family.map((f, i) => ({ d: f.next, k: 'fam', i })).filter(e => diff(e.d) >= 0)
    .sort((a, b) => a.d.localeCompare(b.d)).slice(0, 2);
  const ft = TEMPLES.find(x => x.featured);

  return (
    <>
      <div className="ribbon">{t('sample')}</div>
      <header className="topbar">
        <div className="brand"><div className="logo">🪔</div><div><b>{t('app')}</b><small>📍 {t('place')}</small></div></div>
        <LangToggle />
        <button className="ib" onClick={() => navigate('/settings')} aria-label={t('settings')}>⚙️</button>
      </header>
      <div className="pad">
        <section className="daycard">
          <div className="gm">{t('gm')}</div>
          <div className="md">{t('malDate')}</div>
          <div className="en">{t('engDate')}</div>
          <div className="pill">⭐ {t('star')}: {t('todayStar')}</div>
          <div className="lamp" aria-hidden="true">🪔</div>
        </section>

        <button className="wa-cta" onClick={() => navigate('/whatsapp')}>
          <div className="wi">💬</div>
          <div style={{ flex: 1 }}><b>{t('waCta')}</b><span>{t('waCtaSub')}</span></div><span>›</span>
        </button>

        {famDays.length > 0 && <>
          <div className="h"><h2>{t('familyDays')}</h2><button onClick={() => navigate('/family')}>{t('seeAll')}</button></div>
          <div className="card">{famDays.map(e => <EventRow key={'f' + e.i} e={e} />)}</div>
        </>}

        <div className="h"><h2>{t('comingUp')}</h2><button onClick={() => navigate('/calendar')}>{t('seeCal')}</button></div>
        <div className="card">{upcoming.map(e => <EventRow key={e.d + e.id + e.k} e={e} />)}</div>

        {ft && <>
          <div className="h"><h2>{t('featuredFest')}</h2></div>
          <button className="feat-card" onClick={() => navigate(`/temples/${ft.id}`)}>
            <div className="top"><b>{ft.emoji} {L(ft.fest)}</b><span>{L(ft.name)}, {L(ft.place)}</span></div>
            <div className="bot"><span>📅 {L(ft.dates)} · {ft.km} {t('km')}</span><span className="tag feat">{t('featured')}</span></div>
          </button>
        </>}

        {plan === 'free' && <div className="sponsor">💍 <span>{t('sponsorBy')} <b>{t('sponsorName')}</b></span></div>}

        <div className="soon-card"><div className="e">🚌</div><div><b>{t('tripsCard')}</b><br />{t('soonP3')}</div></div>
      </div>
    </>
  );
}
