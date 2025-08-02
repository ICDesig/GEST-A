import React, { useEffect, useState } from 'react';
import axios from '../../../api';

const ListeRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get('/roles')
      .then(res => setRoles(res.data))
      .catch(err => console.error("Erreur de chargement", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des Rôles</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Nom</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className="border-t">
              <td>{role.name}</td>
              <td>{role.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeRoles;
