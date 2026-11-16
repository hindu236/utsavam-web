import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { CAL, MONTHS, STARS, TEMPLES, TODAY } from '../data/content';
import { malayalamDate, starOfDay } from '../data/panchang';
import { diff, MON_EN_FULL, MON_ML } from '../data/dates';

const WD_LONG = [
  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ['ഞായറാഴ്ച', 'തിങ്കളാഴ്ച', 'ചൊവ്വാഴ്ച', 'ബുധനാഴ്ച', 'വ്യാഴാഴ്ച', 'വെള്ളിയാഴ്ച', 'ശനിയാഴ്ച'],
];
import { EventRow, LangToggle } from '../components/ui';

export default function Today() {
  const { t, L, plan } = useApp();
  const navigate = useNavigate();
  const upcoming = CAL.filter(e => diff(e.d) >= 0 && diff(e.d) <= 16).slice(0, 5);
  const ft = TEMPLES.find(x => x.featured);
  // Real date for today: Malayalam (Kollavarsham) date and the star of the day.
  const md = malayalamDate(TODAY);
  const malDate = `${L(MONTHS[md.month])} ${md.day}, ${md.year}`;
  const engDate = L([
    `${WD_LONG[0][TODAY.getDay()]}, ${TODAY.getDate()} ${MON_EN_FULL[TODAY.getMonth()]} ${TODAY.getFullYear()}`,
    `${WD_LONG[1][TODAY.getDay()]}, ${MON_ML[TODAY.getMonth()]} ${TODAY.getDate()}, ${TODAY.getFullYear()}`,
  ]);
  const todayStar = L(STARS[starOfDay(TODAY)]);

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
          <div className="md">{malDate}</div>
          <div className="en">{engDate}</div>
          <div className="pill">⭐ {t('star')}: {todayStar}</div>
          <div className="lamp" aria-hidden="true">🪔</div>
        </section>

        <button className="wa-cta" onClick={() => navigate('/whatsapp')}>
          <div className="wi">💬</div>
          <div style={{ flex: 1 }}><b>{t('waCta')}</b><span>{t('waCtaSub')}</span></div><span>›</span>
        </button>

        <div className="h"><h2>{t('comingUp')}</h2><button onClick={() => navigate('/calendar')}>{t('seeCal')}</button></div>
        <div className="card">{upcoming.map(e => <EventRow key={e.d + e.id + e.k} e={e} />)}</div>

        {ft && <>
          <div className="h"><h2>{t('featuredFest')}</h2></div>
          <button className="feat-card" onClick={() => navigate(`/temples/${ft.id}`)}>
            <div className="top"><b>{ft.emoji} {L(ft.fest)}</b><span>{L(ft.name)}, {L(ft.place)}</span></div>
            <div className="bot"><span>📅 {L(ft.dates)}</span><span className="tag feat">{t('featured')}</span></div>
          </button>
        </>}

        {plan === 'free' && <div className="sponsor">💍 <span>{t('sponsorBy')} <b>{t('sponsorName')}</b></span></div>}

        <div className="soon-card"><div className="e">🚌</div><div><b>{t('tripsCard')}</b><br />{t('soonP3')}</div></div>
      </div>
    </>
  );
}
