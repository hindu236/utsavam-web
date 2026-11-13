import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { MONTHS, PEOPLE, PLAN_LIMIT, RELS, STARS } from '../data/content';
import { nextFamilyDate } from '../data/dates';
import { Opt, TopBar } from '../components/ui';

function LimitSheet() {
  const { t, closeSheet } = useApp();
  const navigate = useNavigate();
  return (
    <>
      <div className="center"><div className="big-emoji">👨‍👩‍👧‍👦</div><h3>{t('freeLimitT')}</h3><p className="muted">{t('freeLimitP')}</p></div>
      <button className="btn p" onClick={() => { closeSheet(); navigate('/plans'); }}>{t('seePlans')}</button>
    </>
  );
}

export function Family() {
  const { t, L, fmtY, rel, family, setFamily, plan, openSheet, toast } = useApp();
  const navigate = useNavigate();
  const full = family.length >= PLAN_LIMIT[plan];

  return (
    <>
      <TopBar title={t('familyT')} settings />
      <div className="pad">
        <p className="muted intro">{t('familyP')}</p>
        {family.map(f => (
          <div key={f.id} className="card fam-card">
            <div className="row">
              <div className={`ic ${f.type === 'p' ? 'ic-p' : 'ic-s'}`}>{f.type === 'p' ? '🎂' : '🪷'}</div>
              <div className="gr"><b>{L(f.name)} · {f.type === 'p' ? t('pirannal') : t('sraddham')}</b><span>⭐ {L(STARS[f.star])} · {L(MONTHS[f.month])}</span></div>
              <div className="when">{rel(f.next)}</div>
            </div>
            <div className="fam-meta">
              <div><span className="muted">{t('nextDate')}:</span> <b>{fmtY(f.next)}</b></div>
              <div><span className="muted">💬 {t('reminds')}:</span> {f.who.map(w => L(PEOPLE[w])).join(', ')}</div>
              <button className="link-danger" onClick={() => { setFamily(list => list.filter(x => x.id !== f.id)); toast(t('removed')); }}>{t('remove')}</button>
            </div>
          </div>
        ))}
        <button className="btn p" onClick={() => (full ? openSheet(<LimitSheet />) : navigate('/family/add'))}>{t('addFamily')}</button>
        {plan === 'free' && (
          <p className="small center" style={{ marginTop: '.5rem' }}>
            {t('freeLimitT')} · <button className="link" onClick={() => navigate('/plans')}>{t('upgrade')}</button>
          </p>
        )}
        <button className="soon-card" onClick={() => navigate('/setup')}>
          <div className="e">👵</div><div><b>{t('setupParents')}</b><br />{t('setupParentsSub')}</div>
        </button>
      </div>
    </>
  );
}

export function AddFamily() {
  const { t, L, fmtY, rel, family, setFamily, plan, toast } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [relIdx, setRelIdx] = useState(0);
  const [type, setType] = useState('p');
  const [star, setStar] = useState(5);
  const [month, setMonth] = useState(8);
  const [who, setWho] = useState([0]);
  const next = nextFamilyDate(star, month);

  // Guard: direct visits past the plan limit go back to the family list
  if (family.length >= PLAN_LIMIT[plan]) return <Navigate to="/family" replace />;

  const save = () => {
    const nm = name.trim();
    if (!nm) { toast(t('enterName')); return; }
    setFamily(list => [...list, { id: 'f' + Date.now(), name: [nm, nm], rel: relIdx, type, star, month, next, who }]);
    toast(t('added'));
    navigate('/family', { replace: true });
  };
  const toggleWho = i => setWho(w => (w.includes(i) ? w.filter(x => x !== i) : [...w, i]));

  return (
    <>
      <TopBar title={t('addFamilyT')} back fallback="/family" />
      <div className="pad form">
        <div className="field">
          <label htmlFor="fname">{t('name')}</label>
          <input id="fname" value={name} placeholder={t('namePh')} onChange={e => setName(e.target.value)} autoComplete="off" />
        </div>
        <div className="field">
          <label>{t('relation')}</label>
          <div className="chips">
            {RELS.map((r, i) => (
              <button key={i} className={`chip ${relIdx === i ? 'on' : ''}`} onClick={() => { setRelIdx(i); if (!name) setName(L(r)); }}>{L(r)}</button>
            ))}
          </div>
        </div>
        <div className="field">
          <label>{t('type')}</label>
          <div className="two">
            <Opt icon="🎂" title={t('pirannal')} sub={t('pirannalSub')} on={type === 'p'} onToggle={() => setType('p')} />
            <Opt icon="🪷" title={t('sraddham')} sub={t('sraddhamSub')} on={type === 's'} onToggle={() => setType('s')} />
          </div>
        </div>
        <div className="two">
          <div className="field">
            <label htmlFor="fstar">{t('starL')}</label>
            <select id="fstar" value={star} onChange={e => setStar(+e.target.value)}>{STARS.map((s, i) => <option key={i} value={i}>{L(s)}</option>)}</select>
          </div>
          <div className="field">
            <label htmlFor="fmonth">{t('monthL')}</label>
            <select id="fmonth" value={month} onChange={e => setMonth(+e.target.value)}>{MONTHS.map((s, i) => <option key={i} value={i}>{L(s)}</option>)}</select>
          </div>
        </div>
        <div className="calc" aria-live="polite">
          <div className="small calc-k">✓ {t('calcTitle')}</div>
          <b>{fmtY(next)}</b>
          <div className="small">{rel(next)} · {t('calcNote')}</div>
        </div>
        <div className="field">
          <label>{t('whoRemind')}</label>
          <div className="chips">
            {PEOPLE.map((p, i) => (
              <button key={i} className={`chip ${who.includes(i) ? 'ong' : ''}`} onClick={() => toggleWho(i)} aria-pressed={who.includes(i)}>
                {who.includes(i) ? '✓ ' : ''}{L(p)}
              </button>
            ))}
            <button className="chip" onClick={() => toast(t('addPersonToast'))}>{t('addPerson')}</button>
          </div>
        </div>
      </div>
      <div className="sticky"><button className="btn p" onClick={save}>{t('addBtn')}</button></div>
    </>
  );
}
