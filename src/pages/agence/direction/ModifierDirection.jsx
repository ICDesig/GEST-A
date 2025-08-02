import React, { useEffect, useState } from 'react';
import axios from '../../api';
import { useParams } from 'react-router-dom';

const ModifierDirection = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nom: '',
    emailChef: '',
    telephoneChef: '',
    description: ''
  });

  useEffect(() => {
    axios.get(`/directions/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/directions/${id}`, form)
      .then(() => alert('Direction modifiée avec succès'))
      .catch(err => {
        alert('Erreur lors de la modification');
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Modifier la Direction</h2>
      <input
        type="text"
        name="nom"
        placeholder="Nom de la direction"
        value={form.nom}
        onChange={handleChange}
        className="block mb-2"
      />
      <input
        type="email"
        name="emailChef"
        placeholder="Email du chef"
        value={form.emailChef}
        onChange={handleChange}
        className="block mb-2"
      />
      <input
        type="tel"
        name="telephoneChef"
        placeholder="Téléphone du chef"
        value={form.telephoneChef}
        onChange={handleChange}
        className="block mb-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="block mb-4"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Modifier
      </button>
    </form>
  );
};

export default ModifierDirection;
