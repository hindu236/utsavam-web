import { DEMO_TODAY, MONTH_START } from './content';

const MON_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const MON_EN_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const MON_ML = ['ജനുവരി','ഫെബ്രുവരി','മാർച്ച്','ഏപ്രിൽ','മേയ്','ജൂൺ','ജൂലൈ','ഓഗസ്റ്റ്','സെപ്റ്റംബർ','ഒക്ടോബർ','നവംബർ','ഡിസംബർ'];
export const WD_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const WD_ML = ['ഞായർ','തിങ്കൾ','ചൊവ്വ','ബുധൻ','വ്യാഴം','വെള്ളി','ശനി'];
export const WD_ML_S = ['ഞാ','തി','ചൊ','ബു','വ്യാ','വെ','ശ'];

export const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const todayIso = iso(DEMO_TODAY);
export const diff = s => Math.round((parse(s) - DEMO_TODAY) / 86400000);

export const fmt = (s, lang) => {
  const d = parse(s);
  return lang === 'ml' ? `${MON_ML[d.getMonth()]} ${d.getDate()}, ${WD_ML[d.getDay()]}` : `${WD_EN[d.getDay()]}, ${d.getDate()} ${MON_EN[d.getMonth()]}`;
};
export const fmtY = (s, lang) => {
  const d = parse(s);
  return lang === 'ml' ? `${MON_ML[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} (${WD_ML[d.getDay()]})` : `${WD_EN[d.getDay()]}, ${d.getDate()} ${MON_EN[d.getMonth()]} ${d.getFullYear()}`;
};

// Sample only: the real app must calculate this from a panchangam.
export function nextFamilyDate(star, month) {
  const d = parse(MONTH_START[month]);
  d.setDate(d.getDate() + ((star * 7 + month * 3) % 28));
  return iso(d);
}

export const youtube = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
export function googleCalendar(title, date, details = 'Reminder from Utsavam') {
  const d = parse(date), e = new Date(d); e.setDate(e.getDate() + 1);
  const f = x => iso(x).replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${f(d)}/${f(e)}&details=${encodeURIComponent(details)}`;
}
