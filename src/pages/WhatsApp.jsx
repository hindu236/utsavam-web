import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { LangToggle, useBack } from '../components/ui';
import { CAL, MONTHS, PEOPLE, STARS, TODAY, VR, tempById } from '../data/content';
import { diff } from '../data/dates';
import { malayalamDate, starOfDay } from '../data/panchang';

const WD = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ml: ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'] };
const WD_LONG = { en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ml: ['ഞായറാഴ്ച', 'തിങ്കളാഴ്ച', 'ചൊവ്വാഴ്ച', 'ബുധനാഴ്ച', 'വ്യാഴാഴ്ച', 'വെള്ളിയാഴ്ച', 'ശനിയാഴ്ച'] };

// A preview of the WhatsApp messages users receive, built from the real dates.
// The real sending happens on the server (WhatsApp Business API).
export default function WhatsApp() {
  const { t, L, lang, plan, toast, fmt, family } = useApp();
  const navigate = useNavigate();
  const goBack = useBack('/');
  const ml = lang === 'ml';
  const sponsor = plan === 'free' && <div className="sp">💍 {t('sponsorBy')} {t('sponsorName')}</div>;

  const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const wd = s => WD[ml ? 'ml' : 'en'][parseD(s).getDay()];
  const title = e => (e.k === 'vr'
    ? L(e.name || VR[e.id].name)
    : (e.name ? L(e.name) : `${L(tempById(e.id).fest)} · ${L(tempById(e.id).name)}`));

  const md = malayalamDate(TODAY);
  const todayMal = `${L(MONTHS[md.month])} ${md.day}`;
  const todayStar = L(STARS[starOfDay(TODAY)]);
  const todayWd = WD_LONG[ml ? 'ml' : 'en'][TODAY.getDay()];

  const upcoming = CAL.filter(e => diff(e.d) >= 0);
  const comingDays = upcoming.filter(e => e.k === 'vr' && diff(e.d) <= 10).slice(0, 3);
  const nextVr = upcoming.find(e => e.k === 'vr');
  const nextFest = upcoming.find(e => e.k === 'fest');
  const fam = [...family].filter(f => diff(f.next) >= 0).sort((a, b) => a.next.localeCompare(b.next))[0];
  const famWho = fam ? fam.who.filter(i => i > 0).map(i => L(PEOPLE[i])).join(ml ? ', ' : ' and ') : '';

  return (
    <div className="wa-screen">
      <header className="wa-top">
        <button className="ib" onClick={goBack} aria-label={t('back')}>←</button>
        <div className="av">🪔</div>
        <div style={{ flex: 1 }}><b>{t('waName')} ✓</b><span>{t('waVerified')}</span></div>
        <LangToggle />
      </header>

      {nextVr && <>
        <div className="wa-day"><span>{t('yesterday')}</span></div>
        <div className="msg">
          {ml ? <>🔔 വരുന്നു: <b>{title(nextVr)}</b> – {fmt(nextVr.d)}.</>
            : <>🔔 Coming up: <b>{title(nextVr)}</b> on {fmt(nextVr.d)}.</>}
          <div className="tm">6:00 PM</div>
        </div>
      </>}

      <div className="wa-day"><span>{t('todayW')}</span></div>
      <div className="msg">
        {ml ? <>🙏 <b>സുപ്രഭാതം!</b><br />ഇന്ന് <b>{todayMal}</b>, {todayWd} · നക്ഷത്രം: {todayStar}</>
          : <>🙏 <b>Good morning!</b><br />Today is <b>{todayMal}</b>, {todayWd} · Star: {todayStar}</>}
        {comingDays.length > 0 && <>
          <br /><br />📿 <b>{ml ? 'വരും ദിവസങ്ങളിൽ:' : 'Coming days:'}</b>
          {comingDays.map(e => <span key={e.d + e.id}><br />• {diff(e.d) === 0 ? t('todayW') : wd(e.d)} – {title(e)}</span>)}
        </>}
        {nextFest && <>
          <br /><br />🪔 {ml ? 'ഉത്സവം:' : 'Festival:'} {title(nextFest)} – {fmt(nextFest.d)}
        </>}
        {sponsor}
        <div className="tm">6:00 AM</div>
        <div className="qr"><button onClick={() => navigate('/calendar')}>📅 {t('openApp')}</button><button onClick={() => toast(t('stopToast'))}>{t('stop')}</button></div>
      </div>

      {fam && (
        <div className="msg">
          {ml ? <>🎂 <b>{L(fam.name)}</b> ({L(STARS[fam.star])}) – <b>{fmt(fam.next)}</b>.<br />ക്ഷേത്രത്തിൽ വഴിപാട് നടത്താൻ മറക്കരുതേ 🙏{famWho && <><br /><small>{famWho} എന്നിവർക്കും അയച്ചു</small></>}</>
            : <>🎂 <b>{L(fam.name)}</b> ({L(STARS[fam.star])}) is on <b>{fmt(fam.next)}</b>.<br />Don&apos;t forget a vazhipadu at the temple 🙏{famWho && <><br /><small>Also sent to {famWho}</small></>}</>}
          <div className="tm">6:01 AM</div>
          <div className="qr"><button onClick={() => navigate('/family')}>{t('openApp')}</button></div>
        </div>
      )}

      <div className="msg out">{t('thanks')}<div className="tm">6:15 AM ✓✓</div></div>
      <div className="wa-note">{t('waNote')}</div>
    </div>
  );
}
