// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProvider from './context/UserContext';
import Home from './pages/Home';
import UserDetailPage from './pages/UserDetailPage';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
