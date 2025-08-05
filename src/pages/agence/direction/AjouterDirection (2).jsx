import React, { useState } from 'react';
import axios from '../../../api';

const AjouterDirection = () => {
  const [libelle, setLibelle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/directions', { libelle, description })
      .then(() => {
        alert("Direction ajoutée !");
        setLibelle('');
        setDescription('');
      })
      .catch(err => alert("Erreur lors de l’ajout"));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Ajouter une Direction</h2>
      <input type="text" value={libelle} onChange={e => setLibelle(e.target.value)} placeholder="Libellé" className="border p-2 w-full mb-2" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full mb-2"></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Ajouter</button>
    </form>
  );
};

export default AjouterDirection;
