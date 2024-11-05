import React, { useState } from 'react';
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
    import './App.css';
    import HomePage from './HomePage';
    import DiaryPage from './DiaryPage';

    function App() {
      return (
        <BrowserRouter>
          <div className="App">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/diary">Diary</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diary" element={<DiaryPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    }

    export default App;
