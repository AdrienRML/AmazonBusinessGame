import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HubPage from './pages/HubPage';
import FranchisePage from './pages/FranchisePage';
import ConceptPage from './pages/ConceptPage';

function AppContent() {
  const location  = useLocation();
  const params    = new URLSearchParams(location.search);
  const franchise = params.get('franchise');

  const isConceptPage = location.pathname === '/concept';

  return (
    <div className="min-h-screen bg-az-bg">
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
