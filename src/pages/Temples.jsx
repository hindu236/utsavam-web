import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { TEMPLES, tempById } from '../data/content';
import { youtube } from '../data/dates';
import { Hero, RemindSheet, TopBar } from '../components/ui';
import NotFound from './NotFound';

export function Temples() {
  const { t, L } = useApp();
  const navigate = useNavigate();
  // Featured first, then by festival date
  const list = [...TEMPLES].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.date.localeCompare(b.date));
  return (
    <>
      <TopBar title={t('temples')} settings />
      <div className="pad">
        <div className="h"><h2>{t('nearby')}</h2></div>
        <p className="small" style={{ margin: '-.3rem 0 .6rem' }}>{t('within')}</p>
        <div className="card">
          {list.map(tp => (
            <button key={tp.id} className="row" onClick={() => navigate(`/temples/${tp.id}`)}>
              <div className="ic" style={{ background: `linear-gradient(135deg,${tp.c1},${tp.c2})` }}>{tp.emoji}</div>
              <div className="gr">
                <b>{L(tp.name)}</b>
                <span>📍 {L(tp.place)}</span>
                <span>{t('next')}: {L(tp.fest)} · {L(tp.dates)}</span>
                {tp.featured && <span className="tag feat">{t('featured')}</span>}
              </div><span aria-hidden="true">›</span>
            </button>
          ))}
        </div>
        <div className="soon-card"><div className="e">🙏</div><div><b>{t('phase2')}</b><br />{t('soon')} · {t('phase2s')}</div></div>
      </div>
    </>
  );
}

function FeatureSheet() {
  const { t, closeSheet, toast } = useApp();
  return (
    <>
      <h3>⭐ {t('featureT')}</h3>
      <div className="block" style={{ marginTop: 0 }}><ol><li>{t('f1')}</li><li>{t('f2')}</li><li>{t('f3')}</li></ol></div>
      <div className="price-big">{t('fPrice')}</div>
      <button className="btn p" onClick={() => { closeSheet(); toast(t('contacted')); }}>📞 {t('contactUs')}</button>
    </>
  );
}

export function Temple() {
  const { id } = useParams();
  const { t, L, rel, reminded, followed, toggleFollow, openSheet, toast } = useApp();
  const tp = tempById(id);
  if (!tp) return <NotFound />;
  const key = `temple|${tp.id}`;
  const on = reminded.includes(key);
  const fol = followed.includes(tp.id);

  return (
    <>
      <Hero c1={tp.c1} c2={tp.c2} emoji={tp.emoji} kicker={`${L(tp.name)}, ${L(tp.place)}`} title={L(tp.fest)} fallback="/temples">
        <div className="pill">📅 {L(tp.dates)} · {rel(tp.date)}</div>
        {tp.featured && <span className="tag feat" style={{ marginLeft: '.3rem' }}>{t('featured')}</span>}
      </Hero>
      <div className="pad">
        <div className="stack">
          <button className={`btn ${on ? 'w' : 'p'}`} onClick={() => openSheet(<RemindSheet remKey={key} title={`${L(tp.fest)} - ${L(tp.name)}`} date={tp.date} />)}>
            {on ? t('reminderOn') : t('remind')}
          </button>
          <button className="btn w" onClick={() => { if (!fol) toast(t('followToast')); toggleFollow(tp.id); }}>
            {fol ? t('followingT') : t('follow')}
          </button>
        </div>

        <div className="block">
          <h2>{t('programme')}</h2>
          {tp.prog.map(([tm, it]) => <div key={tm} className="prog"><span className="small">{tm}</span><span>{L(it)}</span></div>)}
        </div>

        <div className="block">
          <a className="btn w" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${tp.name[0]}, ${tp.place[0]}`)}`} target="_blank" rel="noopener noreferrer">
            {t('directions')}
          </a>
        </div>

        <div className="block">
          <h2>▶️ {t('relVideos')}</h2>
          <a className="vid" href={youtube(tp.q)} target="_blank" rel="noopener noreferrer">
            <div className="th" style={{ background: `linear-gradient(135deg,${tp.c1},${tp.c2})` }}>{tp.emoji}</div>
            <div><b>{tp.q}</b><span>{t('openYt')}</span></div>
          </a>
        </div>

        <div className="soon-card"><div className="e">🙏</div><div>{t('poojaSoon')}</div></div>
        {!tp.featured && (
          <button className="soon-card gold" onClick={() => openSheet(<FeatureSheet />)}>
            <div className="e">⭐</div><div><b>{t('featureYour')}</b><br />{t('fPrice')}</div>
          </button>
        )}
      </div>
    </>
  );
}
