import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HubPage from './pages/HubPage';
import FranchisePage from './pages/FranchisePage';

function AppContent() {
  const location = useLocation();
  const params   = new URLSearchParams(location.search);
  const franchise = params.get('franchise');

  return (
    <div className="min-h-screen bg-az-bg">
      <Header />
      {franchise
        ? <FranchisePage />
        : <HubPage />
      }
      <footer className="border-t border-az-border py-6 mt-8 text-center text-[11px] text-az-subtle">
        <p>Amazon Kidult Hub · AI-Powered Franchise Discovery · Powered by Claude AI</p>
        <p className="mt-1 text-[10px]">© 2025 Amazon · A GenAI concept for the Kidult category</p>
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
