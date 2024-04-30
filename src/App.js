import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListRecipe from '../src/pages/ListRecipePage';
import DetailRecipe from '../src/pages/DetailRecipePage';


function App() {
  return (
    <div className='Aplicacion'>
      <Routes>
        <Route path="/" element={ <ListRecipe />} />
        <Route path="/detail/:id" element={ <DetailRecipe />} />
      </Routes>
    </div>
    
  );
}

export default App;
