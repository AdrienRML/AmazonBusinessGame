import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HubPage from './pages/HubPage';
import FranchisePage from './pages/FranchisePage';
import ConceptPage from './pages/ConceptPage';

// Franchise-specific full-page background gradients
const FRANCHISE_BG: Record<string, string> = {
  marvel:          'linear-gradient(160deg, #1c0000 0%, #0f0005 45%, #131A22 100%)',
  pokemon:         'linear-gradient(160deg, #0a0e1f 0%, #0d1108 45%, #131A22 100%)',
  lego:            'linear-gradient(160deg, #1a0a00 0%, #100800 45%, #131A22 100%)',
  'action-figures':'linear-gradient(160deg, #001a1f 0%, #000d14 45%, #131A22 100%)',
  'retro-gaming':  'linear-gradient(160deg, #0f001a 0%, #09000f 45%, #131A22 100%)',
  'limited-drops': 'linear-gradient(160deg, #1a0005 0%, #0f0008 45%, #131A22 100%)',
  'fan-cards':     'linear-gradient(160deg, #001a10 0%, #000f0a 45%, #131A22 100%)',
};

function AppContent() {
  const location  = useLocation();
  const params    = new URLSearchParams(location.search);
  const franchise = params.get('franchise');

  const isConceptPage = location.pathname === '/concept';
  const bgStyle = franchise && FRANCHISE_BG[franchise]
    ? { background: FRANCHISE_BG[franchise] }
    : {};

  return (
    <div className="min-h-screen bg-az-bg" style={bgStyle}>
      <Header />
      {isConceptPage
        ? <ConceptPage />
        : franchise
          ? <FranchisePage />
          : <HubPage />
      }
      <footer className="border-t border-az-border py-4 mt-8 text-center text-[10px] text-gray-600">
        <p>Amazon Kidult Hub · AI-Powered Franchise Discovery · Powered by Claude AI</p>
        <p className="mt-0.5">© 2025 Amazon · A GenAI concept for the Kidult category</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
