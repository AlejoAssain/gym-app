import { Route, Routes } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages';
import { AccessControlPage } from './pages/AccessControlPage.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      <Route path='/access-control' element={ <AccessControlPage /> } />
    </Routes>
  )
}

export default App;
