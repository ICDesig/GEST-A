import React, { useState } from 'react';
import { FaUserSlash, FaSearch } from 'react-icons/fa';
import { MdEdit as Edit } from 'react-icons/md';

const ListeUtilisateurs = () => {
  // Exemple de données initiales
  const [utilisateurs, setUtilisateurs] = useState([
    { id: 1, nom: 'Jean Dupont', email: 'jean@exemple.com', role: 'admin', actif: true },
    { id: 2, nom: 'Marie Curie', email: 'marie@exemple.com', role: 'bo', actif: false },
    { id: 3, nom: 'Paul Martin', email: 'paul@exemple.com', role: 'direction', actif: true },
  ]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  // Augmenter la taille du tableau (table) via les classes Tailwind
  // Ajout d'une classe utilitaire pour augmenter la taille du texte et des cellules
  const tableClassName = "min-w-full bg-white rounded-lg shadow text-base"; // text-base pour agrandir le texte
  const thTdClassName = "px-6 py-4 border-b"; // padding augmenté
  const handleEdit = id => {
    alert(`Édition de l'utilisateur avec l'id ${id} (simulation)`);
  };

  const handleDesactiver = id => {
    setUtilisateurs(utilisateurs.map(u =>
      u.id === id ? { ...u, actif: !u.actif } : u
    ));
  };

  // Filtrage par recherche et rôle
  const utilisateursFiltres = utilisateurs.filter(u => {
    const matchSearch =
      u.nom.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-2">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center tracking-wide">
          Liste des utilisateurs
        </h2>
        {/* Barre de recherche et filtre */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Tous les rôles</option>
            <option value="admin">Administrateur</option>
            <option value="bo">Bureau d'ordre</option>
            <option value="dgel">DGEL</option>
            <option value="direction">Direction traitante</option>
          </select>
        </div>
        {/* Tableau */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-3 border-b text-left text-blue-700">Nom</th>
                <th className="px-4 py-3 border-b text-left text-blue-700">Email</th>
                <th className="px-4 py-3 border-b text-left text-blue-700">Rôle</th>
                <th className="px-4 py-3 border-b text-left text-blue-700">Statut</th>
                <th className="px-4 py-3 border-b text-left text-blue-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {utilisateursFiltres.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                utilisateursFiltres.map(u => (
                  <tr key={u.id} className={u.actif ? "hover:bg-blue-50" : "bg-gray-100"}>
                    <td className="px-4 py-3 border-b">{u.nom}</td>
                    <td className="px-4 py-3 border-b">{u.email}</td>
                    <td className="px-4 py-3 border-b capitalize">{u.role}</td>
                    <td className="px-4 py-3 border-b">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${u.actif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {u.actif ? "Actif" : "Désactivé"}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b flex gap-2">
                      <button
                        title="Modifier"
                        onClick={() => handleEdit(u.id)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        title={u.actif ? "Désactiver" : "Activer"}
                        onClick={() => handleDesactiver(u.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                      >
                        <FaUserSlash className="w-5 h-5" />
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

export default ListeUtilisateurs;
