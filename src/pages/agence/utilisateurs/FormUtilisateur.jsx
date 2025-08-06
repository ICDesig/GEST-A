import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserSlash } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

const AjouterUtilisateur = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role_id: '' });
  const [roles, setRoles] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initCSRF = async () => {
    try {
      await axios.get('http://192.168.100.14:8000/sanctum/csrf-cookie');
    } catch (err) {
      console.error("Erreur CSRF :", err);
    }
  };

  const fetchRoles = async () => {
    try {
      await initCSRF();
      const res = await axios.get('http://192.168.100.14:8000/api/gosoft/roles');
      console.log('Réponse API Roles:', res.data);
      
      // Gérer différentes structures de réponse pour les rôles
      if (Array.isArray(res.data)) {
        setRoles(res.data);
      } else if (res.data && Array.isArray(res.data.items)) {
        setRoles(res.data.items);
      } else if (res.data && Array.isArray(res.data.data)) {
        setRoles(res.data.data);
      } else {
        console.warn('Structure des rôles inattendue:', res.data);
        setRoles([]);
      }
    } catch (err) {
      console.error("Erreur chargement rôles :", err);
      setRoles([]);
    }
  };

 const fetchUtilisateurs = async () => {
  setLoading(true);
  setError('');

  try {
    await initCSRF();
    const res = await axios.get('http://192.168.100.14:8000/api/gosoft/users');


    // Vérification de la réponse
    if (!res.data || !Array.isArray(res.data)) {
      throw new Error('Réponse du serveur invalide');
    }

    setUtilisateurs(res.data); // <- Assure-toi que c'est bien un tableau
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        setError('Session expirée, veuillez vous reconnecter');
      } else if (err.response.status === 419) {
        setError('Session expirée, veuillez rafraîchir la page');
      } else {
        setError(err.response.data.message || 'Erreur serveur');
      }
    } else if (err.request) {
      setError('Pas de réponse du serveur');
    } else {
      setError('Erreur: ' + err.message);
    }
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    // Configurer le token s'il existe
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    axios.defaults.withCredentials = true;

    fetchRoles();
    fetchUtilisateurs();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await initCSRF();

      if (editingId) {
        await axios.put(`http://192.168.100.14:8000/api/gosoft/users/edit/${editingId}`, form);
        alert("Utilisateur modifié avec succès !");
        setEditingId(null);
      } else {
        await axios.post('http://192.168.100.14:8000/api/gosoft/users/register', form);
        alert("Utilisateur ajouté avec succès !");
      }

      setForm({ name: '', email: '', password: '', role_id: '' });
      fetchUtilisateurs(); // Recharger tous les utilisateurs
    } catch (err) {
      console.error("Erreur enregistrement :", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erreur lors de l'enregistrement.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = user => {
    setForm({ 
      name: user.name || '', 
      email: user.email || '', 
      password: '', 
      role_id: user.role_id || user.role?.id || '' 
    });
    setEditingId(user.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', email: '', password: '', role_id: '' });
  };

  const handleDelete = async id => {
    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
      setLoading(true);
      try {
        await initCSRF();
        await axios.delete(`http://192.168.100.14:8000/api/gosoft/users/delete/${id}`);
        alert("Utilisateur supprimé avec succès !");
        fetchUtilisateurs(); // Recharger tous les utilisateurs
      } catch (err) {
        console.error("Erreur suppression :", err);
        setError("Erreur lors de la suppression.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleStatus = async user => {
    try {
      await initCSRF();
      // Vous devez implémenter l'endpoint pour changer le statut
      await axios.patch(`http://192.168.100.14:8000/api/gosoft/users`);
      fetchUtilisateurs(); // Recharger tous les utilisateurs
    } catch (err) {
      console.error("Erreur statut :", err);
      setError("Erreur lors du changement de statut.");
    }
  };

  // Fonction pour obtenir le nom du rôle
  const getRoleName = (user) => {
    if (user.role && user.role.name) {
      return user.role.name;
    }
    const role = roles.find(r => r.id === user.role_id);
    return role ? (role.name || role.role) : 'N/A';
  };

  // Filtrage côté client
  const filteredUsers = search 
    ? utilisateurs.filter(user =>
        (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
        (getRoleName(user).toLowerCase().includes(search.toLowerCase()))
      )
    : utilisateurs;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex-1 flex items-center justify-center">
        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
            {editingId ? 'Modifier l\'Utilisateur' : 'Ajouter un Utilisateur'}
          </h2>

          {editingId && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              Mode édition
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
              <button 
                type="button"
                onClick={() => setError('')}
                className="float-right text-red-900 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nom complet"
              className="border border-green-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-green-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Mot de passe {editingId && '(laisser vide pour ne pas changer)'}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="border border-green-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required={!editingId}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">
              Rôle
            </label>
            <select
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
              className="border border-green-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
              disabled={loading}
            >
              <option value="">Sélectionnez un rôle</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.role || role.role}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 rounded shadow transition"
            >
              {loading ? (editingId ? 'Modification...' : 'Ajout en cours...') : (editingId ? 'Modifier' : 'Ajouter')}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold rounded shadow transition"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start p-10">
        {/* En-tête avec barre de recherche */}
        <div className="mb-4 w-full flex gap-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un utilisateur (nom, email, rôle)..."
            className="flex-1 border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            onClick={fetchUtilisateurs}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded shadow transition"
          >
            {loading ? 'Chargement...' : 'Actualiser'}
          </button>
        </div>

        {/* Compteur de résultats */}
        <div className="mb-2 text-sm text-gray-600">
          {search 
            ? `${filteredUsers.length} utilisateur(s) trouvé(s) sur ${utilisateurs.length} total`
            : `${utilisateurs.length} utilisateur(s) au total`
          }
        </div>

        {/* Tableau des utilisateurs */}
        <div className="w-full overflow-x-auto mt-2">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b text-left font-semibold">ID</th>
                <th className="py-3 px-4 border-b text-left font-semibold">Nom</th>
                <th className="py-3 px-4 border-b text-left font-semibold">Email</th>
                <th className="py-3 px-4 border-b text-left font-semibold">Rôle</th>
                <th className="py-3 px-4 border-b text-left font-semibold">Statut</th>
                <th className="py-3 px-4 border-b text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                      Chargement des utilisateurs...
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                    {search ? (
                      <div>
                        <p>Aucun utilisateur trouvé pour la recherche : <strong>"{search}"</strong></p>
                        <button 
                          onClick={() => setSearch('')}
                          className="mt-2 text-blue-600 hover:text-blue-800 underline"
                        >
                          Effacer la recherche
                        </button>
                      </div>
                    ) : (
                      'Aucun utilisateur trouvé.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id || idx} className={`hover:bg-gray-50 transition-colors ${editingId === user.id ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''}`}>
                    <td className="py-3 px-4 border-b font-medium">{user.id || 'N/A'}</td>
                    <td className="py-3 px-4 border-b">{user.name || 'N/A'}</td>
                    <td className="py-3 px-4 border-b">{user.email || 'N/A'}</td>
                    <td className="py-3 px-4 border-b">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {getRoleName(user)}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.is_active !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active !== false ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex gap-1">
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm transition flex items-center gap-1"
                          title="Modifier"
                          onClick={() => handleEdit(user)}
                          type="button"
                          disabled={loading}
                        >
                          <MdEdit size={14} />
                          Modifier
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition flex items-center gap-1"
                          title="Supprimer"
                          onClick={() => handleDelete(user.id)}
                          type="button"
                          disabled={loading}
                        >
                          <MdDelete size={14} />
                          Supprimer
                        </button>
                        <button
                          className={`px-2 py-1 rounded text-sm transition flex items-center gap-1 ${
                            user.is_active !== false 
                              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                          title={user.is_active !== false ? 'Désactiver' : 'Activer'}
                          onClick={() => handleToggleStatus(user)}
                          type="button"
                          disabled={loading}
                        >
                          <FaUserSlash size={12} />
                          {user.is_active !== false ? 'Désactiver' : 'Activer'}
                        </button>
                      </div>
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

export default AjouterUtilisateur;