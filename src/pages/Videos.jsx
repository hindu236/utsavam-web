import { useState } from 'react';
import { useApp } from '../state/AppContext';
import { VIDEOS } from '../data/content';
import { youtube } from '../data/dates';
import { TopBar } from '../components/ui';

const CATS = ['vToday', 'vBhajan', 'vVrat', 'vTemple'];

export default function Videos() {
  const { t, L } = useApp();
  const [cat, setCat] = useState('vToday');
  return (
    <>
      <TopBar title={t('videosT')} settings />
      <div className="pad">
        <p className="small" style={{ margin: '.6rem 0' }}>{t('videosP')}</p>
        <div className="chips" style={{ marginBottom: '.8rem' }}>
          {CATS.map(c => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{t(c)}</button>)}
        </div>
        <div className="card video-list">
          {VIDEOS.filter(v => v.c === cat).map(v => (
            <a key={v.q} className="vid" href={youtube(v.q)} target="_blank" rel="noopener noreferrer">
              <div className="th lg" style={{ background: `linear-gradient(135deg,${v.g[0]},${v.g[1]})` }}>{v.e}</div>
              <div><b>{L(v.n)}</b><span>▶ {t('openYt')}</span></div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
