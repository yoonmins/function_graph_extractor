import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './viewPage/HomeViewPage';
import Expo from './viewPage/ExpoViewPage';
import Log from './viewPage/LogViewPage';
import Line from './viewPage/LineViewPage';
import Qua from './viewPage/QuaViewPage';

import logo from './logo.svg';
import './App.css';
import './styleFile/button.css';
import './styleFile/footer.css';
import './styleFile/header.css';

function App() {
  return (
    <Router>
    <div className="App">
      <header>
        <h1 className='headerBanerListTitle'>Graph Extractor</h1>
        <ul className='headerBanerList'>
          <li><Link className="btn2"to="/expoViewPage">지수함수</Link></li>
          <li><Link className="btn2" to="/logViewPage">로그함수</Link></li>
          <li><Link className="btn2" to="/lineViewPage">일차함수</Link></li>
          <li><Link className="btn2" to="/quaViewPage">이차함수</Link></li>
          <li><Link className="btn" to="/">Home</Link></li>
        </ul>
      </header>
      <body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ExpoViewPage" element={<Expo />} />
          <Route path="/logViewPage" element={<Log />} />
          <Route path="/lineViewPage" element={<Line />} />
          <Route path="/quaViewPage" element={<Qua />} />
        </Routes>
      </body>
      <footer>
        <p>
          &Copyright 2024. yoonmin All rights reserved.
        </p>
      </footer>
    </div>
    </Router>
  );
}

export default App;
