import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AjouterRole = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi des données
      await axios.post('http://192.168.100.14:8000/api/gosoft/roles/create', {
        role: name,
        description: description,
      });

      alert("Rôle ajouté avec succès !");
      setName('');
      setDescription('');

      // Recharge les rôles
      const res = await axios.get('http://192.168.100.14:8000/api/gosoft/roles');
      setRoles(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      alert("Erreur lors de l'ajout du rôle !");
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://192.168.100.14:8000/api/gosoft/roles')
      .then(res => setRoles(Array.isArray(res.data) ? res.data : []))
      .catch(() => setRoles([]));
  }, []);

  const filteredRoles = roles.filter(role =>
    role.role?.toLowerCase().includes(search.toLowerCase()) ||
    role.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex-1 flex items-center justify-center">
        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            Ajouter un Rôle
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Nom du rôle
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nom du rôle"
              className="border border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-blue-300 rounded px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow transition"
          >
            Ajouter
          </button>
        </form>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start p-10">
        {/* Barre de recherche */}
        <div className="mb-4 w-full">
          <input
            ref={searchInput}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un rôle..."
            className="border border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

         {/* Tableau des rôles */}
      <div className="w-full overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Nom</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                  Aucun rôle trouvé.
                </td>
              </tr>
            ) : (
              filteredRoles.map((role, idx) => (
                <tr key={role.id || idx}>
                  <td className="py-2 px-4 border-b">{role.role || ''}</td>
                  <td className="py-2 px-4 border-b">{role.description || ''}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      title="Modifier"
                      onClick={() => alert(`Modifier le rôle: ${role.role}`)}
                      type="button"
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      title="Supprimer"
                      onClick={() => alert(`Supprimer le rôle: ${role.role}`)}
                      type="button"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default AjouterRole;
