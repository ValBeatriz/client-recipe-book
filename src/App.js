import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListRecipe from '../src/pages/ListRecipePage';
import DetailRecipe from '../src/pages/DetailRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import CreateRecipePage from '../src/pages/CreateRecipePage';


function App() {
  return (
    <div className='Aplicacion'>
      <Routes>
        <Route path="/" element={ <ListRecipe />} />
        <Route path="/new" element={ <CreateRecipePage /> } />
        <Route path="/detail/:id" element={ <DetailRecipe />} />
        <Route path="/edit/:id" element={ <EditRecipePage />} />
      </Routes>
    </div>
    
  );
}

export default App;
