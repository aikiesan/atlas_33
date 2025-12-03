import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/public/LandingPage';
import Dashboard from './pages/public/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<Layout><div className="p-8">Submit Project (Coming Soon)</div></Layout>} />
        <Route path="/admin/login" element={<Layout><div className="p-8">Admin Login (Coming Soon)</div></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
