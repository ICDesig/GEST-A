import React, { useState } from 'react';
import axios from '../../api';

const AjouterUtilisateur = () => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/utilisateurs', form)
      .then(() => alert("Utilisateur ajouté"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>
      <input name="nom" placeholder="Nom" onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} />
      <input name="password" placeholder="Mot de passe" type="password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="">-- Choisir un rôle --</option>
        <option value="admin">Administrateur</option>
        <option value="bo">Bureau d'ordre</option>
        <option value="dgel">DGEL</option>
        <option value="direction">Direction traitante</option>
      </select>
      <button type="submit">Créer</button>
    </form>
  );
};

export default AjouterUtilisateur;
