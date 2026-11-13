import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from './state/AppContext';
import { SheetHost, TabBar, Toast } from './components/ui';
import Today from './pages/Today';
import WhatsApp from './pages/WhatsApp';
import Calendar from './pages/Calendar';
import Vratham from './pages/Vratham';
import { Temple, Temples } from './pages/Temples';
import { AddFamily, Family } from './pages/Family';
import Videos from './pages/Videos';
import { Plans, Settings, Setup } from './pages/Settings';
import NotFound from './pages/NotFound';

// Scroll to the top whenever the page changes.
function OnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Shell() {
  return (
    <div className="app">
      <OnRouteChange />
      <main className="screen">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/whatsapp" element={<WhatsApp />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/vratham/:id/:date" element={<Vratham />} />
          <Route path="/temples" element={<Temples />} />
          <Route path="/temples/:id" element={<Temple />} />
          <Route path="/family" element={<Family />} />
          <Route path="/family/add" element={<AddFamily />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <TabBar />
      <SheetHost />
      <Toast />
    </div>
  );
}

// HashRouter (#/calendar) works on any static host, including GitHub Pages, with no server setup.
export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </AppProvider>
  );
}
