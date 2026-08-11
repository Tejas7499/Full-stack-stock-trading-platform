import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { MarketProvider } from "./context/MarketContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MarketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MarketProvider>
  </React.StrictMode>
);

