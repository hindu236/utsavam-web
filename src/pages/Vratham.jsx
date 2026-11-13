import { useParams } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { VR } from '../data/content';
import { youtube } from '../data/dates';
import { Hero, RemindSheet } from '../components/ui';
import NotFound from './NotFound';

export default function Vratham() {
  const { id, date } = useParams();
  const { t, L, fmtY, rel, reminded, openSheet } = useApp();
  const v = VR[id];
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return <NotFound />;
  const key = `${id}|${date}`;
  const on = reminded.includes(key);

  return (
    <>
      <Hero c1={v.c1} c2={v.c2} emoji={v.emoji} kicker={t('vrathamL')} title={L(v.name)} fallback="/calendar">
        <div className="pill">📅 {fmtY(date)} · {rel(date)}</div>
      </Hero>
      <div className="pad">
        <div className="block"><h2>{t('whatIs')}</h2><p>{L(v.what)}</p></div>
        <div className="block">
          <h2>{t('howObserve')}</h2>
          <ol>{v.how.map((h, i) => <li key={i}>{L(h)}</li>)}</ol>
          <p className="small" style={{ marginTop: '.5rem' }}>{t('varies')}</p>
        </div>
        <div className="block">
          <h2>▶️ {t('relVideos')}</h2>
          {v.q.map(q => (
            <a key={q} className="vid" href={youtube(q)} target="_blank" rel="noopener noreferrer">
              <div className="th" style={{ background: `linear-gradient(135deg,${v.c1},${v.c2})` }}>{v.emoji}</div>
              <div><b>{q}</b><span>{t('openYt')}</span></div>
            </a>
          ))}
        </div>
      </div>
      <div className="sticky">
        <button className={`btn ${on ? 'w' : 'p'}`} onClick={() => openSheet(<RemindSheet remKey={key} title={L(v.name)} date={date} />)}>
          {on ? t('reminderOn') : t('remind')}
        </button>
      </div>
    </>
  );
}
