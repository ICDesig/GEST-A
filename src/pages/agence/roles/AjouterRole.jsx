import React, { useState } from 'react';
import axios from '../../../api';

const AjouterRole = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/roles', { name, description })
      .then(() => {
        alert("Rôle ajouté !");
        setName('');
        setDescription('');
      })
      .catch(err => alert("Erreur lors de l’ajout du rôle"));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Ajouter un Rôle</h2>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom du rôle"
        className="border p-2 w-full mb-2"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Ajouter</button>
    </form>
  );
};

export default AjouterRole;
