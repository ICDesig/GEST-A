import React, { useEffect, useState } from 'react';
import axios from '../../api';

const OrientationCourrier = () => {
  const [courriers, setCourriers] = useState([]);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    axios.get('/courriers/orientables').then(res => setCourriers(res.data));
    axios.get('/directions').then(res => setDirections(res.data));
  }, []);

  const orienter = (courrierId, directionId) => {
    axios.post(`/courriers/${courrierId}/orienter`, { direction_id: directionId })
      .then(() => alert("Orienté avec succès"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orientation des courriers</h2>
      {courriers.map(courrier => (
        <div key={courrier.id} className="mb-4">
          <p>{courrier.reference} - {courrier.objet}</p>
          <select onChange={e => orienter(courrier.id, e.target.value)}>
            <option>Choisir une direction</option>
            {directions.map(dir => (
              <option key={dir.id} value={dir.id}>{dir.nom}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default OrientationCourrier;
