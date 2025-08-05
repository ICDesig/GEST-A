import React, { useState } from 'react';
import { FaUserSlash } from "react-icons/fa";
import { MdEdit as Edit } from "react-icons/md";

const AjouterUtilisateur = () => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    role: '',
  });

  const [utilisateurs, setUtilisateurs] = useState([]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUtilisateurs([...utilisateurs, { ...form, id: Date.now(), actif: true }]);
    setForm({ nom: '', email: '', password: '', role: '' });
    alert("Utilisateur ajouté (simulation)");
  };

  const handleEdit = id => {
    const user = utilisateurs.find(u => u.id === id);
    setForm({ ...user, password: '' });
    setUtilisateurs(utilisateurs.filter(u => u.id !== id));
  };

  const handleDesactiver = id => {
    setUtilisateurs(utilisateurs.map(u =>
      u.id === id ? { ...u, actif: !u.actif } : u
    ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Formulaire à gauche */}
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-7 border border-gray-100"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 text-center tracking-tight">
          Ajouter un utilisateur
        </h2>
        <div>
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="nom">
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            placeholder="Nom"
            onChange={handleChange}
            value={form.nom}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={form.email}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            placeholder="Mot de passe"
            type="password"
            onChange={handleChange}
            value={form.password}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="role">
            Rôle
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            value={form.role}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white"
          >
            <option value="">-- Choisir un rôle --</option>
            <option value="admin">Administrateur</option>
            <option value="bo">Bureau d'ordre</option>
            <option value="dgel">DGEL</option>
            <option value="direction">Direction traitante</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2.5 rounded-lg shadow hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
        >
          Créer
        </button>
      </form>

      {/* Tableau à droite */}
      <div className="md:w-1/2 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
          Liste des utilisateurs
        </h2>
        <table className="min-w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <thead>
            <tr className="bg-indigo-50">
              <th className="px-4 py-3 border-b font-semibold text-gray-700">Nom</th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700">Rôle</th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700">Statut</th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Aucun utilisateur ajouté.
                </td>
              </tr>
            ) : (
              utilisateurs.map(u => (
                <tr key={u.id} className={u.actif ? "hover:bg-indigo-50 transition" : "bg-gray-100"}>
                  <td className="px-4 py-3 border-b">{u.nom}</td>
                  <td className="px-4 py-3 border-b">{u.email}</td>
                  <td className="px-4 py-3 border-b capitalize">{u.role}</td>
                  <td className="px-4 py-3 border-b">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${u.actif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {u.actif ? "Actif" : "Désactivé"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b flex gap-3">
                    <button
                      title="Modifier"
                      onClick={() => handleEdit(u.id)}
                      className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      title={u.actif ? "Désactiver" : "Activer"}
                      onClick={() => handleDesactiver(u.id)}
                      className={`p-2 rounded-full ${u.actif ? "bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800" : "bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800"} transition`}
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
  );
};

export default AjouterUtilisateur;
