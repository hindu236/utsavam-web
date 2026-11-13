import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { googleCalendar } from '../data/dates';
import { LangToggle, Opt, TopBar } from '../components/ui';

export function Settings() {
  const { t, plan, size, setSize, toast, resetDemo } = useApp();
  const navigate = useNavigate();
  const planName = { free: t('free'), basic: t('basic'), family: t('fam') }[plan];
  const planSub = { free: t('pf3'), basic: t('pb1'), family: t('pm1') }[plan];

  return (
    <>
      <TopBar title={t('settings')} back />
      <div className="pad">
        <div className="h"><h2>{t('planH')}</h2></div>
        <button className="card row" onClick={() => navigate('/plans')}>
          <div className="ic">💎</div><div className="gr"><b>{planName}</b><span>{planSub}</span></div>
          <span className="btn sm p">{plan === 'family' ? '✓' : t('upgrade')}</span>
        </button>

        <div className="h"><h2>{t('remindersH')}</h2></div>
        <div className="card">
          <div className="row"><div className="ic">💬</div><div className="gr"><b>{t('dailyMsg')}</b><span>{t('at6')}</span></div><span className="tag fam">ON</span></div>
          <a className="row" href={googleCalendar('Utsavam vratham days', '2026-11-16', 'Sample: the real app adds one shared Utsavam calendar')} target="_blank" rel="noopener noreferrer" onClick={() => toast(t('gcalAll'))}>
            <div className="ic">📆</div><div className="gr"><b>{t('gcalSync')}</b><span>{t('gcalSyncSub')}</span></div><span aria-hidden="true">↗</span>
          </a>
          <div className="row"><div className="ic">🔊</div><div className="gr"><b>{t('voice')}</b></div><span className="tag vr">{t('soon')}</span></div>
        </div>

        <div className="h"><h2>{t('forParents')}</h2></div>
        <button className="card row" onClick={() => navigate('/setup')}>
          <div className="ic">👵</div><div className="gr"><b>{t('setupParents')}</b><span>{t('setupParentsSub')}</span></div><span aria-hidden="true">›</span>
        </button>

        <div className="h"><h2>{t('displayH')}</h2></div>
        <div className="card">
          <div className="row">
            <div className="ic">🔠</div><div className="gr"><b>{t('textSize')}</b></div>
            <div className="sizes">{[16, 18, 20].map((n, i) => (
              <button key={n} className={size === n ? 'on' : ''} style={{ fontSize: 13 + i * 3 }} onClick={() => setSize(n)} aria-label={`Text size ${n}`}>A</button>
            ))}</div>
          </div>
          <div className="row"><div className="ic">🌐</div><div className="gr"><b>{t('language')}</b></div><LangToggle /></div>
        </div>

        <div className="h"><h2>{t('nextH')}</h2></div>
        <div className="card">
          <div className="row"><div className="ic">🙏</div><div className="gr"><b>{t('phase2')}</b></div><span className="tag vr">{t('phase2s')}</span></div>
          <div className="row"><div className="ic">🚌</div><div className="gr"><b>{t('phase3')}</b></div><span className="tag vr">{t('phase3s')}</span></div>
        </div>

        <div className="h"><h2>{t('demoH')}</h2></div>
        <button className="btn w" onClick={() => { resetDemo(); toast(t('resetDone')); }}>↺ {t('resetDemo')}</button>
      </div>
    </>
  );
}

export function Setup() {
  const { t, lang, openSheet, closeSheet, toast } = useApp();
  const navigate = useNavigate();
  const ml = lang === 'ml';
  const [opts, setOpts] = useState([true, true, true, true]);
  const [time, setTime] = useState('6:00 AM');

  const welcome = () => openSheet(
    <>
      <h3>{t('preview')}</h3>
      <div className="wa-preview">
        <div className="msg">
          {ml ? <>🙏 <b>നമസ്കാരം അമ്മേ!</b><br />ഉണ്ണി അമ്മയ്ക്കായി <b>ഉത്സവം</b> സജ്ജമാക്കിയിരിക്കുന്നു.<br /><br />ഇനി എല്ലാ ദിവസവും രാവിലെ {time}-ന് ഇവിടെ ലഭിക്കും:<br />📿 വ്രത ദിനങ്ങൾ<br />🪔 അടുത്തുള്ള ക്ഷേത്രോത്സവങ്ങൾ<br />🎂 കുടുംബാംഗങ്ങളുടെ പിറന്നാളും ശ്രാദ്ധവും<br /><br />ഒന്നും ചെയ്യേണ്ടതില്ല. നിർത്താൻ "STOP" എന്ന് അയച്ചാൽ മതി.</>
            : <>🙏 <b>Namaskaram Amma!</b><br />Unni has set up <b>Utsavam</b> for you.<br /><br />Every morning at {time} you will get:<br />📿 Vratham days<br />🪔 Nearby temple festivals<br />🎂 Family pirannal and sraddham<br /><br />You don't need to do anything. Reply "STOP" anytime to stop.</>}
          <div className="tm">{time}</div>
        </div>
      </div>
      <button className="btn wa" style={{ marginTop: '.8rem' }} onClick={() => { closeSheet(); toast(t('welcomeSent')); navigate('/family'); }}>{t('sendNow')}</button>
    </>
  );

  return (
    <>
      <TopBar title={t('setupParents')} back fallback="/family" />
      <div className="pad form">
        <div className="calc note"><div className="big-emoji sm">👵👴</div><div>{t('setupP')}</div></div>
        <div className="field"><label htmlFor="pn">{t('pName')}</label><input id="pn" defaultValue={ml ? 'സരോജിനി (അമ്മ)' : 'Sarojini (Amma)'} /></div>
        <div className="field"><label htmlFor="pw">{t('pWa')}</label><input id="pw" defaultValue="+91 94470 12345" inputMode="tel" /></div>
        <div className="field"><label htmlFor="pp">{t('pPlace')}</label><input id="pp" defaultValue={ml ? 'മുളക്കുഴ, ചെങ്ങന്നൂർ' : 'Mulakuzha, Chengannur'} /></div>
        <div className="field">
          <label>{t('whatSend')}</label>
          {['o1', 'o2', 'o3', 'o4'].map((k, i) => (
            <Opt key={k} icon={['☀️', '📿', '🪔', '🎂'][i]} title={t(k)} on={opts[i]} onToggle={() => setOpts(o => o.map((v, j) => (j === i ? !v : v)))} />
          ))}
        </div>
        <div className="field">
          <label>{t('msgTime')}</label>
          <div className="chips">{['5:30 AM', '6:00 AM', '7:00 AM'].map(x => <button key={x} className={`chip ${time === x ? 'on' : ''}`} onClick={() => setTime(x)}>{x}</button>)}</div>
        </div>
      </div>
      <div className="sticky"><button className="btn wa" onClick={welcome}>💬 {t('sendWelcome')}</button></div>
    </>
  );
}

const PLANS = [
  { id: 'free', n: 'free', price: '₹0', f: ['pf1', 'pf2', 'pf3'] },
  { id: 'basic', n: 'basic', price: '₹49', f: ['pf2', 'pb1', 'pb2', 'pb3'] },
  { id: 'family', n: 'fam', price: '₹99', f: ['pm1', 'pm2', 'pm3', 'pm4'], best: true },
];

export function Plans() {
  const { t, plan, setPlan, openSheet, closeSheet, toast } = useApp();
  const buy = p => {
    openSheet(<div className="center"><h3>{t('payUpi')}</h3><div className="spinner" /><b className="price-big">{p.price}</b></div>);
    setTimeout(() => { closeSheet(); setPlan(p.id); toast(t('planOn', { p: t(p.n) })); }, 1500);
  };
  return (
    <>
      <TopBar title={t('plansT')} back />
      <div className="pad">
        <p className="muted intro">{t('plansP')}</p>
        {PLANS.map(p => (
          <div key={p.id} className={`plan ${p.best ? 'best' : ''}`}>
            {p.best && <span className="ribbon2">{t('best')}</span>}
            <h2>{t(p.n)}</h2>
            <div className="price">{p.price} {p.id !== 'free' && <small>{t('perMonth')}</small>}</div>
            <ul>{p.f.map(k => <li key={k}>{t(k)}</li>)}</ul>
            {plan === p.id
              ? <button className="btn w" disabled>✓ {t('current')}</button>
              : p.id !== 'free' && <button className={`btn ${p.best ? 'p' : 'w'}`} onClick={() => buy(p)}>{t('choose')} · {p.price} {t('perMonth')}</button>}
          </div>
        ))}
      </div>
    </>
  );
}
