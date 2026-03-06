import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import FranchisePage from './pages/FranchisePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-kidult-bg">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoveryPage />} />
            <Route path="/franchise/:id" element={<FranchisePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-kidult-border py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-kidult-orange flex items-center justify-center text-black font-black text-xs">
                K
              </div>
              <span className="text-sm text-kidult-muted">Amazon Kidult Universe · Powered by Claude AI</span>
            </div>
            <div className="text-xs text-kidult-muted">
              A GenAI franchise discovery concept for Amazon's Kidult category
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
