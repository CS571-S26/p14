import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SavedPage from './pages/SavedPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/location/:id" element={<DetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
