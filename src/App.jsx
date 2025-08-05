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
import AccueilB from './pages/agence/Direction2/AccueilB';
import Accueil3 from './pages/agence/direction3/Accueil3';
import FormUtilisateur from './pages/agence/utilisateurs/FormUtilisateur';
import FormCategorie from './pages/agence/utilisateurs/Formcategorie';
import AjoutRole from './pages/agence/roles/AjouterRole';
import ListeUtilisateurs from './pages/agence/utilisateurs/ListeUtilisateurs';

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
        <Route path="/agence/utilisateurs/form-utilisateur" element={<FormUtilisateur />} />
        <Route path="/agence/utilisateurs/form-categorie" element={<FormCategorie />} />
        <Route path="/agence/roles/ajout-role" element={<AjoutRole />} />
        <Route path="/agence/utilisateurs/liste-utilisateurs" element={<ListeUtilisateurs />} />
        
        {/* Redirection par défaut */}

       
      </Routes>
    </Router>
  );
}

export default App;
