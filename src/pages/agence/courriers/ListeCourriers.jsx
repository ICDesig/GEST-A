import React, { useEffect, useState } from 'react';
import axios from '../../../api';

const ListeCourriers = () => {
  const [courriers, setCourriers] = useState([]);

  useEffect(() => {
    axios.get('/courriers')
      .then(response => setCourriers(response.data))
      .catch(error => console.error('Erreur de chargement des courriers', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des Courriers</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Code</th>
            <th>Type</th>
            <th>Nom</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courriers.map(c => (
            <tr key={c.id} className="border-t">
              <td>{c.code}</td>
              <td>{c.type_courrier}</td>
              <td>{c.nom} {c.prénom}</td>
              <td>{c.statut}</td>
              <td><a href={`/agence/courriers/${c.id}`} className="text-blue-600">Voir</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeCourriers;
