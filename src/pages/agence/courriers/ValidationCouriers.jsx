import React, { useEffect, useState } from 'react';
import axios from '../../api';

const ValidationCourrier = () => {
  const [courriers, setCourriers] = useState([]);

  useEffect(() => {
    axios.get('/courriers?status=attente')
      .then(res => setCourriers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleValidation = (id, action) => {
    axios.post(`/courriers/${id}/validation`, { action })
      .then(() => setCourriers(prev => prev.filter(c => c.id !== id)));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Validation des courriers</h2>
      <ul>
        {courriers.map(courrier => (
          <li key={courrier.id}>
            {courrier.reference} - {courrier.objet}
            <button onClick={() => handleValidation(courrier.id, 'valider')}>Valider</button>
            <button onClick={() => handleValidation(courrier.id, 'rejeter')}>Rejeter</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationCourrier;
