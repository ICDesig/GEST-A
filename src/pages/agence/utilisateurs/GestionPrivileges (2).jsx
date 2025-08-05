import React, { useEffect, useState } from 'react';
import axios from '../../api';

const GestionPrivileges = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [droits, setDroits] = useState({}); // { [userId]: { create: true, validate: false, ... } }

  useEffect(() => {
    axios.get('/utilisateurs')
      .then(res => {
        setUtilisateurs(res.data);
        const droitsInitiaux = {};
        res.data.forEach(user => {
          droitsInitiaux[user.id] = {
            creer: user.droits?.creer || false,
            valider: user.droits?.valider || false,
            modifier: user.droits?.modifier || false,
            supprimer: user.droits?.supprimer || false,
          };
        });
        setDroits(droitsInitiaux);
      });
  }, []);

  const handleToggle = (userId, droit) => {
    setDroits(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [droit]: !prev[userId][droit],
      }
    }));
  };

  const handleSave = (userId) => {
    axios.post(`/utilisateurs/${userId}/droits`, droits[userId])
      .then(() => alert("Droits mis à jour"))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion des privilèges</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Créer</th>
            <th>Valider</th>
            <th>Modifier</th>
            <th>Supprimer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map(user => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              {['creer', 'valider', 'modifier', 'supprimer'].map(droit => (
                <td key={droit}>
                  <input
                    type="checkbox"
                    checked={droits[user.id]?.[droit] || false}
                    onChange={() => handleToggle(user.id, droit)}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => handleSave(user.id)} className="text-blue-500">Enregistrer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionPrivileges;
