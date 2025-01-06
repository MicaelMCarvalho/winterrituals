import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import InteractiveMap from './pages/Map/interactivemap';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<InteractiveMap />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
