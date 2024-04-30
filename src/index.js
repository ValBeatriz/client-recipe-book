import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateRecipePage from './pages/CreateRecipePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreateRecipePage />
    <HomePage /> 
  </React.StrictMode>
);


reportWebVitals();
