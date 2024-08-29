// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Carrocel from './components/Carrocel';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Bem-vindo ao Meu Projeto React</h1>
          <h4>Biblioteca</h4>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/carrocel" element={<Carrocel />} />
        </Routes>
        </header>
      
      </div>
    </Router>
  );
}

export default App;
