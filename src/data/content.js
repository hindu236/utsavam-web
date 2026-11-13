// SAMPLE DATA ONLY. Temples are fictional; dates and panchangam values are not verified.
// Replace with real data (and a panchangam source) before launch.

// Fixed "today" for the demo, so the sample dates always look upcoming.
export const DEMO_TODAY = new Date(2026, 10, 13); // Fri 13 Nov 2026

export const STARS = [['Ashwathi','അശ്വതി'],['Bharani','ഭരണി'],['Karthika','കാർത്തിക'],['Rohini','രോഹിണി'],['Makayiram','മകയിരം'],['Thiruvathira','തിരുവാതിര'],['Punartham','പുണർതം'],['Pooyam','പൂയം'],['Ayilyam','ആയില്യം'],['Makam','മകം'],['Pooram','പൂരം'],['Uthram','ഉത്രം'],['Atham','അത്തം'],['Chithira','ചിത്തിര'],['Chothi','ചോതി'],['Vishakham','വിശാഖം'],['Anizham','അനിഴം'],['Thrikketta','തൃക്കേട്ട'],['Moolam','മൂലം'],['Pooradam','പൂരാടം'],['Uthradam','ഉത്രാടം'],['Thiruvonam','തിരുവോണം'],['Avittam','അവിട്ടം'],['Chathayam','ചതയം'],['Pooruruttathi','പൂരുരുട്ടാതി'],['Uthruttathi','ഉത്രട്ടാതി'],['Revathi','രേവതി']];
export const MONTHS = [['Chingam','ചിങ്ങം'],['Kanni','കന്നി'],['Thulam','തുലാം'],['Vrischikam','വൃശ്ചികം'],['Dhanu','ധനു'],['Makaram','മകരം'],['Kumbham','കുംഭം'],['Meenam','മീനം'],['Medam','മേടം'],['Idavam','ഇടവം'],['Mithunam','മിഥുനം'],['Karkidakam','കർക്കടകം']];
// Approximate start of each Malayalam month in the next 12 months (sample)
export const MONTH_START = { 3: '2026-11-16', 4: '2026-12-16', 5: '2027-01-14', 6: '2027-02-13', 7: '2027-03-15', 8: '2027-04-14', 9: '2027-05-15', 10: '2027-06-15', 11: '2027-07-17', 0: '2027-08-17', 1: '2027-09-17', 2: '2027-10-17' };
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
  { id: 'bhadrakali', emoji: '🪔', c1: '#7A1E2C', c2: '#D9701A', featured: true, km: 3.2,
    name: ['Sree Bhadrakali Devi Temple', 'ശ്രീ ഭദ്രകാളി ദേവീക്ഷേത്രം'], place: ['Mulakuzha', 'മുളക്കുഴ'],
    fest: ['Thiruvutsavam', 'തിരുവുത്സവം'], date: '2026-11-24', dates: ['24 Nov – 1 Dec', 'നവംബർ 24 – ഡിസംബർ 1'],
    time: ['5:00–11:00 AM · 5:00–8:00 PM', 'രാവിലെ 5:00–11:00 · വൈകിട്ട് 5:00–8:00'],
    prog: [['24 Nov · 7:00 PM', ['Kodiyettam', 'കൊടിയേറ്റ്']], ['26 Nov · 9:30 PM', ['Kathakali', 'കഥകളി']], ['30 Nov · 10:00 PM', ['Pallivetta', 'പള്ളിവേട്ട']], ['1 Dec · 5:00 PM', ['Aarattu procession', 'ആറാട്ട് ഘോഷയാത്ര']]],
    q: 'Kerala temple utsavam' },
  { id: 'mahavishnu', emoji: '🐚', c1: '#1d3b6e', c2: '#4b84c9', km: 5.8,
    name: ['Sree Mahavishnu Temple', 'ശ്രീ മഹാവിഷ്ണു ക്ഷേത്രം'], place: ['Thiruvanvandoor', 'തിരുവൻവണ്ടൂർ'],
    fest: ['Ekadashi Vilakku', 'ഏകാദശി വിളക്ക്'], date: '2026-11-20', dates: ['20 Nov', 'നവംബർ 20'],
    time: ['4:30–11:30 AM · 5:00–8:00 PM', 'രാവിലെ 4:30–11:30 · വൈകിട്ട് 5:00–8:00'],
    prog: [['20 Nov · 5:00 AM', ['Nirmalyam', 'നിർമ്മാല്യം']], ['20 Nov · 6:30 PM', ['Vilakku & Deeparadhana', 'വിളക്കും ദീപാരാധനയും']]], q: 'Vishnu temple Kerala' },
  { id: 'mahadeva', emoji: '🔱', c1: '#3a2a5e', c2: '#7a5bb0', km: 4.1,
    name: ['Sree Mahadeva Temple', 'ശ്രീ മഹാദേവ ക്ഷേത്രം'], place: ['Puliyoor', 'പുലിയൂർ'],
    fest: ['Pradosha Pooja', 'പ്രദോഷ പൂജ'], date: '2026-11-22', dates: ['22 Nov', 'നവംബർ 22'],
    time: ['5:00–11:00 AM · 5:00–7:30 PM', 'രാവിലെ 5:00–11:00 · വൈകിട്ട് 5:00–7:30'],
    prog: [['22 Nov · 5:30 PM', ['Pradosha Pooja', 'പ്രദോഷ പൂജ']]], q: 'Shiva temple Kerala' },
  { id: 'subrahmanya', emoji: '🦚', c1: '#0f5c4a', c2: '#2a9a77', km: 6.4,
    name: ['Sree Subrahmanya Swami Temple', 'ശ്രീ സുബ്രഹ്മണ്യ സ്വാമി ക്ഷേത്രം'], place: ['Pandanad', 'പാണ്ടനാട്'],
    fest: ['Shashti Pooja', 'ഷഷ്ഠി പൂജ'], date: '2026-11-15', dates: ['15 Nov', 'നവംബർ 15'],
    time: ['5:00–10:30 AM · 5:00–8:00 PM', 'രാവിലെ 5:00–10:30 · വൈകിട്ട് 5:00–8:00'],
    prog: [['15 Nov · 9:00 AM', ['Shashti Pooja', 'ഷഷ്ഠി പൂജ']]], q: 'Subrahmanya temple Kerala' },
  { id: 'sastha', emoji: '🛕', c1: '#2b2b2b', c2: '#6a4b2a', km: 7.9,
    name: ['Sree Dharma Sastha Temple', 'ശ്രീ ധർമ്മശാസ്താ ക്ഷേത്രം'], place: ['Ala', 'ആല'],
    fest: ['Mandala Vilakku', 'മണ്ഡല വിളക്ക്'], date: '2026-11-28', dates: ['28 Nov', 'നവംബർ 28'],
    time: ['4:00–11:00 AM · 5:00–9:00 PM', 'രാവിലെ 4:00–11:00 · വൈകിട്ട് 5:00–9:00'],
    prog: [['28 Nov · 6:30 PM', ['Mandala Vilakku', 'മണ്ഡല വിളക്ക്']], ['Daily in Mandala season', ['Mala dharanam for Sabarimala pilgrims', 'ശബരിമല തീർത്ഥാടകർക്ക് മാലയിടൽ']]], q: 'Ayyappa temple Kerala' },
];

// k: 'vr' = vratham, 'fest' = temple festival
export const CAL = [
  { d: '2026-11-15', k: 'vr', id: 'shashti' }, { d: '2026-11-16', k: 'vr', id: 'mandala' },
  { d: '2026-11-20', k: 'vr', id: 'ekadashi' }, { d: '2026-11-22', k: 'vr', id: 'pradosham' },
  { d: '2026-11-24', k: 'vr', id: 'karthika' }, { d: '2026-11-24', k: 'fest', id: 'bhadrakali' },
  { d: '2026-11-28', k: 'fest', id: 'sastha' }, { d: '2026-12-05', k: 'vr', id: 'ekadashi', name: ['Ekadashi', 'ഏകാദശി'] },
  { d: '2026-12-07', k: 'vr', id: 'pradosham' }, { d: '2026-12-15', k: 'vr', id: 'shashti' },
  { d: '2026-12-27', k: 'fest', id: 'sastha', name: ['Mandala Pooja', 'മണ്ഡലപൂജ'] },
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

export const DEFAULT_FAMILY = [
  { id: 'f1', name: ['Amma', 'അമ്മ'], rel: 0, type: 'p', star: 5, month: 3, next: '2026-11-18', who: [0, 1, 2] },
  { id: 'f2', name: ['Achan', 'അച്ഛൻ'], rel: 1, type: 's', star: 8, month: 11, next: '2027-08-02', who: [0, 1, 2, 3] },
];

export const PLAN_LIMIT = { free: 2, basic: 10, family: Infinity };
export const tempById = id => TEMPLES.find(x => x.id === id);
