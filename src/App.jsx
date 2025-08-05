import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Accueil from './pages/public/Accueil';
import ChoixType from './pages/public/ChoixType';
import FormulairePhysique from './pages/public/FormulairePhysique';
import FormulaireMorale from './pages/public/FormulaireMorale';
import Confirmation from './pages/public/Confirmation';

import Login from './pages/agence/login';
import Dashboard from './pages/agence/Dashboard';
import AccueilA from './pages/agence/Direction1/AccueilA';
import AccueilB from './pages/agence/direction2/AccueilB';

import ChoixT from './pages/agence/Direction2/choix';
import FormP from './pages/agence/Direction2/formulaireP';
import FormM from './pages/agence/Direction2/formulaireM';

import Accueil3 from './pages/agence/Direction3/Accueil3';

//import './assets/tailwind.css';

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
        <Route path="/agence/direction1/AccueilA" element={<AccueilA />} />
        <Route path="/agence/direction2/AccueilB" element={<AccueilB />} />
        <Route path="/agence/direction3/Accueil3" element={<Accueil3 />} />
        <Route path="/agence/direction2/choix" element={<ChoixT />} />
        <Route path="/agence/direction2/formulaireP" element={<FormP />} />
        <Route path="/agence/direction2/formulaireM" element={<FormM />} />


       
      </Routes>
    </Router>
  );
}

export default App;
