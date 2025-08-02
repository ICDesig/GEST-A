import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api';

const DetailCourrier = () => {
  const { id } = useParams();
  const [courrier, setCourrier] = useState(null);

  useEffect(() => {
    axios.get(`/courriers/${id}`)
      .then(res => setCourrier(res.data))
      .catch(err => console.error("Erreur", err));
  }, [id]);

  if (!courrier) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Détail du Courrier</h2>
      <p><strong>Code :</strong> {courrier.code}</p>
      <p><strong>Type :</strong> {courrier.type_courrier}</p>
      <p><strong>Nom :</strong> {courrier.nom} {courrier.prénom}</p>
      <p><strong>Statut :</strong> {courrier.statut}</p>
      <p><strong>Texte :</strong> {courrier.texte}</p>
    </div>
  );
};

export default DetailCourrier;
