import React, { useEffect, useState } from 'react';
import axios from '../../../api';

const ListeDirections = () => {
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    axios.get('/directions')
      .then(res => setDirections(res.data))
      .catch(err => console.error("Erreur de chargement", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Directions</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Libellé</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {directions.map(d => (
            <tr key={d.id} className="border-t">
              <td>{d.libelle}</td>
              <td>{d.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeDirections;
