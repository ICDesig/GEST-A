import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../api';

const DetailsUtilisateur = () => {
  const { id } = useParams();
  const [utilisateur, setUtilisateur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUtilisateur();
  }, []);

  const fetchUtilisateur = async () => {
    try {
      const res = await axios.get(`/employes/${id}`);
      setUtilisateur(res.data);
    } catch (error) {
      console.error("Erreur de chargement", error);
    }
  };

  const handleRetour = () => {
    navigate('/agence/utilisateurs');
  };

  if (!utilisateur) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Détails de l'utilisateur</h2>
      <p><strong>Nom :</strong> {utilisateur.nom}</p>
      <p><strong>Prénom :</strong> {utilisateur.prenom}</p>
      <p><strong>Rôle :</strong> {utilisateur.role}</p>
      <button onClick={handleRetour} className="mt-4 bg-gray-300 px-4 py-2 rounded">
        Retour
      </button>
    </div>
  );
};

export default DetailsUtilisateur;
