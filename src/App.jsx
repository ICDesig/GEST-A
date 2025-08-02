import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Accueil from './pages/public/Accueil';
import ChoixType from './pages/public/ChoixType';
import FormulairePhysique from './pages/public/FormulairePhysique';
import FormulaireMorale from './pages/public/FormulaireMorale';
import Confirmation from './pages/public/Confirmation';

import Login from './pages/agence/login';
import Dashboard from './pages/agence/Dashboard';

import './assets/tailwind.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Portail public */}
        <Route path="/" element={<Accueil />} />
        <Route path="/choix-type" element={<ChoixType />} />
        <Route path="/formulaire-physique" element={<FormulairePhysique />} />
        <Route path="/formulaire-morale" element={<FormulaireMorale />} />
        <Route path="/confirmation" element={<Confirmation />} />

        {/* 🔐 Portail agence */}
        <Route path="/agence/login" element={<Login />} />
        <Route path="/agence/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
