import React, { useState } from 'react';
import axios from '../../api';

const EnregistrementCourrier = () => {
  const [form, setForm] = useState({
    reference: '',
    type: 'entrant',
    expéditeur: '',
    objet: '',
    fichier: null
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);

    axios.post('/courriers', data)
      .then(() => alert("Courrier enregistré"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Nouveau courrier</h2>
      <input name="reference" placeholder="Référence" onChange={handleChange} />
      <select name="type" onChange={handleChange}>
        <option value="entrant">Entrant</option>
        <option value="sortant">Sortant</option>
      </select>
      <input name="expéditeur" placeholder="Expéditeur" onChange={handleChange} />
      <input name="objet" placeholder="Objet" onChange={handleChange} />
      <input name="fichier" type="file" onChange={handleChange} />
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default EnregistrementCourrier;
