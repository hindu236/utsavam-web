# Utsavam (web, Phase 1)

A mobile-first web app for people aged 45+ in Kerala: vratham days, nearby temple festivals, family star reminders (pirannal and sraddham) and spiritual videos. Reminders go out mainly on WhatsApp, with Google Calendar as an option.

This is a **frontend demo for clients**. It has no backend yet.

> **All data is sample data.** The temples are fictional, and the dates, stars and Malayalam calendar values are **not verified** against a panchangam. The demo uses a fixed "today" of 13 Nov 2026 (`DEMO_TODAY` in `src/data/content.js`).

## Run it on your computer

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

- Open the "Local" address in your browser.
- To test on your phone, connect it to the same Wi-Fi and open the "Network" address that `npm run dev` prints.

## Build for hosting

```bash
npm run build      # creates the dist/ folder
npm run preview    # check the built version locally
```

Upload `dist/` to any static host. The app uses hash URLs (`#/calendar`), so it needs no server configuration.

- **Netlify:** drag the `dist` folder onto app.netlify.com/drop.
- **Vercel:** import the GitHub repo. Framework preset: Vite.
- **GitHub Pages:** build, then publish the `dist` folder (for example with the `gh-pages` package or a GitHub Action).

## What's in Phase 1

| Screen | Route |
|---|---|
| Today | `#/` |
| WhatsApp message preview | `#/whatsapp` |
| Calendar | `#/calendar` |
| Vratham detail + reminder | `#/vratham/ekadashi/2026-11-20` |
| Nearby temples / temple detail | `#/temples`, `#/temples/bhadrakali` |
| Family stars / add family day | `#/family`, `#/family/add` |
| Set up for my parents | `#/setup` |
| Videos (open on YouTube) | `#/videos` |
| Settings (text size, language, demo reset) | `#/settings` |
| Plans (Free / ₹49 / ₹99) | `#/plans` |

Revenue features shown: sponsor line (free plan), featured temple festival (₹999), and the Basic/Family plans.

Coming soon (shown in the app): pooja booking (Phase 2), group trips (Phase 3).

## What's simulated

- Payments (UPI), WhatsApp sending, Google Maps directions, "Stop" and adding family numbers are demos.
- **Real links:** YouTube searches and "Add to Google Calendar" (opens the user's own Google Calendar).
- The family star date is a **placeholder calculation** (`nextFamilyDate` in `src/data/dates.js`). The real app must use a panchangam.
- Settings, reminders and family days are saved in the browser on that device only. Settings → "Reset demo data" restores the sample data.

## Project structure

```
src/
  App.jsx              routes and app shell
  styles.css           all styles (mobile-first, rem-based for the text-size setting)
  state/AppContext.jsx language, text size, plan, reminders, family (saved in localStorage)
  data/i18n.js         every English / Malayalam string
  data/content.js      sample temples, vratham info, calendar, videos
  data/dates.js        date formatting, Google Calendar and YouTube links
  components/ui.jsx    top bar, tab bar, sheets, toast, event rows
  pages/               one file per screen
```

## Next steps before a real launch

1. A verified panchangam source for vratham days and star-based family dates.
2. Real temple data for the Chengannur area (collected manually at first).
3. A backend for user accounts and reminders, plus the WhatsApp Business API (each message has a cost).
4. A payments provider for plans and featured festivals.
