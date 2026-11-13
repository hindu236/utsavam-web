import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { LangToggle, useBack } from '../components/ui';

// A preview of the WhatsApp messages users receive. The real sending happens on the server (WhatsApp Business API).
export default function WhatsApp() {
  const { t, lang, plan, toast } = useApp();
  const navigate = useNavigate();
  const goBack = useBack('/');
  const ml = lang === 'ml';
  const sponsor = plan === 'free' && <div className="sp">💍 {t('sponsorBy')} {t('sponsorName')}</div>;

  return (
    <div className="wa-screen">
      <header className="wa-top">
        <button className="ib" onClick={goBack} aria-label={t('back')}>←</button>
        <div className="av">🪔</div>
        <div style={{ flex: 1 }}><b>{t('waName')} ✓</b><span>{t('waVerified')}</span></div>
        <LangToggle />
      </header>

      <div className="wa-day"><span>{t('yesterday')}</span></div>
      <div className="msg">
        {ml ? <>🔔 നാളെ <b>ഷഷ്ഠി വ്രതം</b>. സുബ്രഹ്മണ്യ സ്വാമി ക്ഷേത്രം, പാണ്ടനാട് – രാവിലെ 9 മണിക്ക് ഷഷ്ഠി പൂജ.</>
          : <>🔔 Tomorrow is <b>Shashti vratham</b>. Sree Subrahmanya Swami Temple, Pandanad – Shashti Pooja at 9 AM.</>}
        <div className="tm">6:00 PM</div>
      </div>

      <div className="wa-day"><span>{t('todayW')}</span></div>
      <div className="msg">
        {ml ? <>🙏 <b>സുപ്രഭാതം!</b><br />ഇന്ന് <b>തുലാം 27</b>, വെള്ളിയാഴ്ച · നക്ഷത്രം: ഉത്രാടം<br /><br />📿 <b>വരും ദിവസങ്ങളിൽ:</b><br />• ഞായർ – ഷഷ്ഠി വ്രതം<br />• തിങ്കൾ – <b>മണ്ഡല വ്രതാരംഭം</b> (വൃശ്ചികം 1)<br />• വെള്ളി – ഗുരുവായൂർ ഏകാദശി<br /><br />🪔 അടുത്തുള്ള ഉത്സവം: ശ്രീ ഭദ്രകാളി ദേവീക്ഷേത്രം, മുളക്കുഴ – നവംബർ 24 കൊടിയേറ്റ്</>
          : <>🙏 <b>Good morning!</b><br />Today is <b>Thulam 27</b>, Friday · Star: Uthradam<br /><br />📿 <b>Coming days:</b><br />• Sun – Shashti vratham<br />• Mon – <b>Mandala vratham begins</b> (Vrischikam 1)<br />• Fri – Guruvayur Ekadashi<br /><br />🪔 Nearby festival: Sree Bhadrakali Devi Temple, Mulakuzha – Kodiyettam on 24 Nov</>}
        {sponsor}
        <div className="tm">6:00 AM</div>
        <div className="qr"><button onClick={() => navigate('/calendar')}>📅 {t('openApp')}</button><button onClick={() => toast(t('stopToast'))}>{t('stop')}</button></div>
      </div>

      <div className="msg">
        {ml ? <>🎂 <b>അമ്മയുടെ പിറന്നാൾ</b> (തിരുവാതിര) ബുധനാഴ്ച, <b>നവംബർ 18</b>-ന്.<br />ക്ഷേത്രത്തിൽ വഴിപാട് നടത്താൻ മറക്കരുതേ 🙏<br /><small>ഉണ്ണി, പ്രിയ എന്നിവർക്കും അയച്ചു</small></>
          : <>🎂 <b>Amma's pirannal</b> (Thiruvathira) is on Wednesday, <b>18 Nov</b>.<br />Don't forget a vazhipadu at the temple 🙏<br /><small>Also sent to Unni and Priya</small></>}
        <div className="tm">6:01 AM</div>
        <div className="qr"><button onClick={() => navigate('/family')}>{t('openApp')}</button></div>
      </div>

      <div className="msg out">{t('thanks')}<div className="tm">6:15 AM ✓✓</div></div>
      <div className="wa-note">{t('waNote')}</div>
    </div>
  );
}
