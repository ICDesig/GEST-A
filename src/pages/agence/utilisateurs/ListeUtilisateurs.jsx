import React, { useEffect, useState } from 'react';
import axios from '../../api';

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    axios.get('/utilisateurs')
      .then(res => setUtilisateurs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleToggleActivation = (id, actif) => {
    axios.patch(`/utilisateurs/${id}/toggle`, { actif: !actif })
      .then(() => {
        setUtilisateurs(prev =>
          prev.map(user => user.id === id ? { ...user, actif: !actif } : user)
        );
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map(user => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.actif ? "Actif" : "Bloqué"}</td>
              <td>
                <button onClick={() => handleToggleActivation(user.id, user.actif)}>
                  {user.actif ? "Bloquer" : "Activer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeUtilisateurs;
