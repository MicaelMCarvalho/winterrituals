import React from 'react';
import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import InteractiveMap from './pages/Map/interactivemap';
import About from './pages/About/About';
import AdminPage from './pages/Admin/admin';
import LoginPage from './pages/User/login';
import UpcomingFestivals from './pages/List/nextEvents';
import { useTranslation } from 'react-i18next';

import './App.css';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/upcomingevents" element={<UpcomingFestivals />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
