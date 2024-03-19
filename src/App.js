import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import MatchingPage from './FoodPreferencesPage';
import Navbar from './Navbar';
import YourMatch from './YourMatch';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/food-preferences" element={<MatchingPage />} />
          <Route path="/yourmatch" element={<YourMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
