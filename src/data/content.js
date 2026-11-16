// Real data for Kerala, Vrischikam 1202 (Nov 2026 - Jan 2027).
// Vratham dates: Kerala almanac (Vrischika Masam 2026) and Drik Panchang, and
// checked against our own sun/moon calculation (src/data/panchang.js).
// Temple dates: published festival calendars (see SOURCES at the bottom).

// Real "today" (start of the day on this device).
const now = new Date();
export const TODAY = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const STARS = [['Ashwathi','അശ്വതി'],['Bharani','ഭരണി'],['Karthika','കാർത്തിക'],['Rohini','രോഹിണി'],['Makayiram','മകയിരം'],['Thiruvathira','തിരുവാതിര'],['Punartham','പുണർതം'],['Pooyam','പൂയം'],['Ayilyam','ആയില്യം'],['Makam','മകം'],['Pooram','പൂരം'],['Uthram','ഉത്രം'],['Atham','അത്തം'],['Chithira','ചിത്തിര'],['Chothi','ചോതി'],['Vishakham','വിശാഖം'],['Anizham','അനിഴം'],['Thrikketta','തൃക്കേട്ട'],['Moolam','മൂലം'],['Pooradam','പൂരാടം'],['Uthradam','ഉത്രാടം'],['Thiruvonam','തിരുവോണം'],['Avittam','അവിട്ടം'],['Chathayam','ചതയം'],['Pooruruttathi','പൂരുരുട്ടാതി'],['Uthruttathi','ഉത്രട്ടാതി'],['Revathi','രേവതി']];
export const MONTHS = [['Chingam','ചിങ്ങം'],['Kanni','കന്നി'],['Thulam','തുലാം'],['Vrischikam','വൃശ്ചികം'],['Dhanu','ധനു'],['Makaram','മകരം'],['Kumbham','കുംഭം'],['Meenam','മീനം'],['Medam','മേടം'],['Idavam','ഇടവം'],['Mithunam','മിഥുനം'],['Karkidakam','കർക്കടകം']];
export const RELS = [['Amma','അമ്മ'],['Achan','അച്ഛൻ'],['Ammoomma','അമ്മൂമ്മ'],['Appooppan','അപ്പൂപ്പൻ'],['Son','മകൻ'],['Daughter','മകൾ'],['Wife / Husband','ഭാര്യ / ഭർത്താവ്']];
export const PEOPLE = [['Me','ഞാൻ'],['Unni','ഉണ്ണി'],['Priya','പ്രിയ'],['Amma','അമ്മ']];

export const VR = {
  ekadashi: { emoji: '🐚', c1: '#1d3b6e', c2: '#4b84c9', name: ['Guruvayur Ekadashi', 'ഗുരുവായൂർ ഏകാദശി'],
    what: ['The 11th day of each lunar fortnight, dedicated to Lord Vishnu. The Ekadashi in Vrischikam is especially important at Guruvayur.', 'ഓരോ പക്ഷത്തിലെയും പതിനൊന്നാം ദിവസം, മഹാവിഷ്ണുവിന് സമർപ്പിതം. വൃശ്ചികമാസത്തിലെ ഗുരുവായൂർ ഏകാദശി ഏറെ പ്രധാനമാണ്.'],
    how: [['Fast, or eat light food without rice', 'ഉപവാസം, അല്ലെങ്കിൽ അരിയാഹാരം ഒഴിവാക്കിയുള്ള ലഘുഭക്ഷണം'], ['Chant Vishnu Sahasranamam or Harinama Keerthanam', 'വിഷ്ണുസഹസ്രനാമം / ഹരിനാമകീർത്തനം ജപിക്കുക'], ['End the vratham the next morning (Dwadashi)', 'പിറ്റേന്ന് (ദ്വാദശി) രാവിലെ വ്രതം അവസാനിപ്പിക്കുക']],
    q: ['Guruvayur Ekadashi', 'Vishnu Sahasranamam Malayalam', 'Ekadashi vratham Malayalam'] },
  mandala: { emoji: '🛕', c1: '#2b2b2b', c2: '#6a4b2a', name: ['Mandala vratham begins', 'മണ്ഡല വ്രതാരംഭം'],
    what: ['A 41-day vratham from Vrischikam 1, kept by devotees preparing for Sabarimala darshan.', 'വൃശ്ചികം 1 മുതൽ 41 ദിവസത്തെ വ്രതം, ശബരിമല ദർശനത്തിനായി ഭക്തർ ആചരിക്കുന്നു.'],
    how: [['Wear the mala and begin the vratham', 'മാലയിട്ട് വ്രതം ആരംഭിക്കുക'], ['Simple vegetarian food and a disciplined life', 'സസ്യാഹാരവും ലളിത ജീവിതവും'], ['Pray every morning and evening', 'ദിവസവും രാവിലെയും വൈകിട്ടും പ്രാർത്ഥന']],
    q: ['Mandala vratham rules Malayalam', 'Ayyappa bhajan Malayalam', 'Harivarasanam'] },
  pradosham: { emoji: '🔱', c1: '#3a2a5e', c2: '#7a5bb0', name: ['Pradosham', 'പ്രദോഷം'],
    what: ['The twilight of the 13th lunar day, dedicated to Lord Shiva.', 'ത്രയോദശി ദിവസത്തെ സന്ധ്യാസമയം, പരമശിവന് സമർപ്പിതം.'],
    how: [['Fast until evening', 'സന്ധ്യ വരെ ഉപവാസം'], ['Visit a Shiva temple at dusk', 'വൈകിട്ട് ശിവക്ഷേത്ര ദർശനം'], ['Chant "Om Namah Shivaya"', '"ഓം നമഃ ശിവായ" ജപിക്കുക']],
    q: ['Pradosham Malayalam', 'Shiva bhajan Malayalam', 'Om Namah Shivaya chanting'] },
  shashti: { emoji: '🦚', c1: '#0f5c4a', c2: '#2a9a77', name: ['Shashti vratham', 'ഷഷ്ഠി വ്രതം'],
    what: ['The 6th lunar day, dedicated to Lord Subrahmanya.', 'പക്ഷത്തിലെ ആറാം ദിവസം, സുബ്രഹ്മണ്യ സ്വാമിക്ക് സമർപ്പിതം.'],
    how: [['Fast until noon', 'ഉച്ചവരെ ഉപവാസം'], ['Visit a Subrahmanya temple', 'സുബ്രഹ്മണ്യ ക്ഷേത്ര ദർശനം'], ['Chant Skanda Shashti Kavacham', 'സ്കന്ദഷഷ്ഠി കവചം ജപിക്കുക']],
    q: ['Shashti vratham Malayalam', 'Skanda Shashti Kavacham', 'Subrahmanya bhajan Malayalam'] },
  karthika: { emoji: '🪔', c1: '#7A1E2C', c2: '#D9701A', name: ['Thrikarthika', 'തൃക്കാർത്തിക'],
    what: ['The festival of lamps on Karthika star in Vrischikam, important for Devi worship.', 'വൃശ്ചികമാസത്തിലെ കാർത്തിക നാളിൽ ദീപങ്ങളുടെ ഉത്സവം, ദേവീപൂജയ്ക്ക് പ്രധാനം.'],
    how: [['Light lamps at home at dusk', 'സന്ധ്യയ്ക്ക് വീട്ടിൽ ദീപം തെളിയിക്കുക'], ['Visit a Devi temple', 'ദേവീക്ഷേത്ര ദർശനം'], ['Pray together as a family', 'കുടുംബത്തോടൊപ്പം പ്രാർത്ഥന']],
    q: ['Thrikarthika Kerala', 'Devi bhajan Malayalam', 'Karthika deepam'] },
};

export const TEMPLES = [
  { id: 'guruvayur', emoji: '🐚', c1: '#1d3b6e', c2: '#4b84c9', featured: true,
    name: ['Guruvayur Sree Krishna Temple', 'ഗുരുവായൂർ ശ്രീകൃഷ്ണ ക്ഷേത്രം'], place: ['Guruvayur, Thrissur', 'ഗുരുവായൂർ, തൃശ്ശൂർ'],
    fest: ['Guruvayur Ekadashi', 'ഗുരുവായൂർ ഏകാദശി'], date: '2026-11-21', dates: ['Sat, 21 Nov 2026', 'നവംബർ 21, ശനി'],
    prog: [['17 Nov', ['Mandalakalam begins', 'മണ്ഡലകാലാരംഭം']], ['21 Nov', ['Guruvayur Ekadashi', 'ഗുരുവായൂർ ഏകാദശി']], ['22 Nov', ['Dwadashi Panam Samarpanam', 'ദ്വാദശി പണം സമർപ്പണം']], ['14 Dec', ['Narayaneeya Dinam', 'നാരായണീയ ദിനം']], ['16 Dec', ['Kuchela Dinam', 'കുചേല ദിനം']], ['27 Dec', ['Kalabhattam · Mandala Pooja', 'കളഭാട്ടം · മണ്ഡലപൂജ']]],
    q: 'Guruvayur Ekadashi' },
  { id: 'sabarimala', emoji: '🛕', c1: '#2b2b2b', c2: '#6a4b2a',
    name: ['Sabarimala Sree Dharma Sastha Temple', 'ശബരിമല ശ്രീ ധർമ്മശാസ്താ ക്ഷേത്രം'], place: ['Sabarimala, Pathanamthitta', 'ശബരിമല, പത്തനംതിട്ട'],
    fest: ['Mandala season begins', 'മണ്ഡലകാലം ആരംഭം'], date: '2026-11-17', dates: ['From Tue, 17 Nov 2026', 'നവംബർ 17 മുതൽ'],
    prog: [['17 Nov', ['Vrischikam 1 · 41-day Mandala vratham begins', 'വൃശ്ചികം 1 · 41 ദിവസത്തെ മണ്ഡല വ്രതാരംഭം']], ['27 Dec', ['Mandala Pooja', 'മണ്ഡലപൂജ']]],
    q: 'Sabarimala Mandala season' },
  { id: 'kumaranalloor', emoji: '🪔', c1: '#7A1E2C', c2: '#D9701A',
    name: ['Kumaranalloor Devi Temple', 'കുമാരനല്ലൂർ ദേവീക്ഷേത്രം'], place: ['Kumaranalloor, Kottayam', 'കുമാരനല്ലൂർ, കോട്ടയം'],
    fest: ['Thrikarthika Mahotsavam', 'തൃക്കാർത്തിക മഹോത്സവം'], date: '2026-11-24', dates: ['Thrikarthika: Tue, 24 Nov 2026', 'തൃക്കാർത്തിക: നവംബർ 24, ചൊവ്വ'],
    prog: [['24 Nov', ['Thrikarthika, the main festival day', 'തൃക്കാർത്തിക, പ്രധാന ഉത്സവ ദിനം']]],
    q: 'Kumaranalloor Thrikarthika' },
  { id: 'chakkulathukavu', emoji: '🔥', c1: '#8a2b0e', c2: '#d4652a',
    name: ['Chakkulathukavu Sree Bhagavathi Temple', 'ചക്കുളത്തുകാവ് ശ്രീ ഭഗവതി ക്ഷേത്രം'], place: ['Neerattupuram, Thiruvalla', 'നീരേറ്റുപുറം, തിരുവല്ല'],
    fest: ['Pongala', 'പൊങ്കാല'], date: '2026-11-24', dates: ['Tue, 24 Nov 2026', 'നവംബർ 24, ചൊവ്വ'],
    prog: [['24 Nov', ['Karthika Pongala', 'കാർത്തിക പൊങ്കാല']]],
    q: 'Chakkulathukavu Pongala' },
  { id: 'vaikom', emoji: '🔱', c1: '#3a2a5e', c2: '#7a5bb0',
    name: ['Vaikom Mahadeva Temple', 'വൈക്കം മഹാദേവ ക്ഷേത്രം'], place: ['Vaikom, Kottayam', 'വൈക്കം, കോട്ടയം'],
    fest: ['Vaikathashtami', 'വൈക്കത്തഷ്ടമി'], date: '2026-12-01', dates: ['Tue, 1 Dec 2026', 'ഡിസംബർ 1, ചൊവ്വ'],
    prog: [['1 Dec', ['Vaikathashtami', 'വൈക്കത്തഷ്ടമി']]],
    q: 'Vaikathashtami' },
  { id: 'thiruvilwamala', emoji: '⛰️', c1: '#0f5c4a', c2: '#2a9a77',
    name: ['Thiruvilwamala Vilwadrinatha Temple', 'തിരുവില്വാമല വില്വാദ്രിനാഥ ക്ഷേത്രം'], place: ['Thiruvilwamala, Thrissur', 'തിരുവില്വാമല, തൃശ്ശൂർ'],
    fest: ['Punarjani Noozhal', 'പുനർജ്ജനി നൂഴൽ'], date: '2026-11-21', dates: ['Sat, 21 Nov 2026', 'നവംബർ 21, ശനി'],
    prog: [['21 Nov', ['Punarjani Noozhal (Guruvayur Ekadashi day)', 'പുനർജ്ജനി നൂഴൽ (ഗുരുവായൂർ ഏകാദശി ദിനം)']]],
    q: 'Thiruvilwamala Punarjani' },
];

// k: 'vr' = vratham, 'fest' = temple festival
export const CAL = [
  { d: '2026-11-17', k: 'vr', id: 'mandala' },
  { d: '2026-11-21', k: 'vr', id: 'ekadashi' },
  { d: '2026-11-21', k: 'fest', id: 'thiruvilwamala' },
  { d: '2026-11-22', k: 'vr', id: 'pradosham' },
  { d: '2026-11-24', k: 'vr', id: 'karthika' },
  { d: '2026-11-24', k: 'fest', id: 'kumaranalloor' },
  { d: '2026-11-24', k: 'fest', id: 'chakkulathukavu' },
  { d: '2026-12-01', k: 'fest', id: 'vaikom' },
  { d: '2026-12-04', k: 'vr', id: 'ekadashi', name: ['Ekadashi', 'ഏകാദശി'] },
  { d: '2026-12-06', k: 'vr', id: 'pradosham' },
  { d: '2026-12-14', k: 'fest', id: 'guruvayur', name: ['Narayaneeya Dinam · Guruvayur', 'നാരായണീയ ദിനം · ഗുരുവായൂർ'] },
  { d: '2026-12-15', k: 'vr', id: 'shashti' },
  { d: '2026-12-20', k: 'vr', id: 'ekadashi', name: ['Ekadashi', 'ഏകാദശി'] },
  { d: '2026-12-27', k: 'fest', id: 'sabarimala', name: ['Mandala Pooja · Sabarimala', 'മണ്ഡലപൂജ · ശബരിമല'] },
  { d: '2027-01-03', k: 'vr', id: 'ekadashi', name: ['Ekadashi', 'ഏകാദശി'] },
  { d: '2027-01-14', k: 'vr', id: 'shashti' },
  { d: '2027-01-19', k: 'vr', id: 'ekadashi', name: ['Ekadashi', 'ഏകാദശി'] },
];

export const VIDEOS = [
  { c: 'vToday', e: '🐚', g: ['#1d3b6e', '#4b84c9'], n: ['Guruvayur Ekadashi: what to know', 'ഗുരുവായൂർ ഏകാദശി: അറിയേണ്ടതെല്ലാം'], q: 'Guruvayur Ekadashi' },
  { c: 'vToday', e: '🛕', g: ['#2b2b2b', '#6a4b2a'], n: ['Mandala vratham: how to begin', 'മണ്ഡല വ്രതം: എങ്ങനെ ആരംഭിക്കാം'], q: 'Mandala vratham Malayalam' },
  { c: 'vBhajan', e: '🎶', g: ['#7A1E2C', '#D9701A'], n: ['Harinama Keerthanam', 'ഹരിനാമകീർത്തനം'], q: 'Harinama Keerthanam' },
  { c: 'vBhajan', e: '🎶', g: ['#2b2b2b', '#6a4b2a'], n: ['Ayyappa bhajans', 'അയ്യപ്പ ഭജനകൾ'], q: 'Ayyappa bhajan Malayalam' },
  { c: 'vBhajan', e: '🎶', g: ['#7A1E2C', '#b8862a'], n: ['Devi bhajans', 'ദേവീ ഭജനകൾ'], q: 'Devi bhajan Malayalam' },
  { c: 'vVrat', e: '📿', g: ['#1d3b6e', '#4b84c9'], n: ['Ekadashi vratham explained', 'ഏകാദശി വ്രതം: വിശദീകരണം'], q: 'Ekadashi vratham Malayalam' },
  { c: 'vVrat', e: '📿', g: ['#3a2a5e', '#7a5bb0'], n: ['Pradosha vratham explained', 'പ്രദോഷ വ്രതം: വിശദീകരണം'], q: 'Pradosha vratham Malayalam' },
  { c: 'vTemple', e: '🛕', g: ['#0f5c4a', '#2a9a77'], n: ['Temples around Chengannur', 'ചെങ്ങന്നൂരിലെ ക്ഷേത്രങ്ങൾ'], q: 'Chengannur temples' },
  { c: 'vTemple', e: '🐘', g: ['#7A1E2C', '#D9701A'], n: ['Kerala temple festivals', 'കേരള ക്ഷേത്രോത്സവങ്ങൾ'], q: 'Kerala temple festival' },
];

// Example family days. Their next date is calculated from the star and month.
export const DEFAULT_FAMILY = [
  { id: 'f1', name: ['Amma', 'അമ്മ'], rel: 0, type: 'p', star: 5, month: 3, who: [0, 1, 2] },
  { id: 'f2', name: ['Achan', 'അച്ഛൻ'], rel: 1, type: 's', star: 8, month: 11, who: [0, 1, 2, 3] },
];

export const PLAN_LIMIT = { free: 2, basic: 10, family: Infinity };
export const tempById = id => TEMPLES.find(x => x.id === id);

// SOURCES (checked 16 Nov 2026):
// - Kerala almanac, Vrischika Masam 2026: hindu-blog.com/2009/11/vrishchika-masam-vrishchikam-month-2009.html
// - Guruvayur temple dates 2026: hindu-blog.com/2016/01/guruvayur-temple-festival-2016.html
// - Guruvayur Ekadashi 2026: drikpanchang.com/malayalam/ekadashis/guruvayur/guruvayur-ekadashi-date-time.html
// - Chakkulathukavu Pongala 2026: templesofkerala.org/alappuzhafest/chakkulathukavupongala.html
// - Ekadashi, Pradosham, Shashti after 15 Dec: calculated in src/data/panchang.js
