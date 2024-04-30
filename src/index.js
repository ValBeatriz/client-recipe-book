import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Aplicacion from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Aplicacion />
  </BrowserRouter>,
  document.getElementById("raiz")
);
