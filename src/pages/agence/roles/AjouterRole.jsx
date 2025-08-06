import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AjouterRole = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchInput = useRef(null);

  // État pour la pagination côté serveur
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalRoles, setTotalRoles] = useState(0);

  // État pour l'édition
  const [editingRole, setEditingRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour récupérer les rôles avec recherche côté serveur
  const fetchRoles = async (page = 1, searchTerm = "") => {
    setLoading(true);
    setError("");

    try {
      // Construire l'URL avec les paramètres de recherche
      let url = `http://192.168.100.14:8000/api/gosoft/roles?page=${page}`;
      if (searchTerm.trim()) {
        url += `&search=${encodeURIComponent(searchTerm.trim())}`;
      }

      const response = await axios.get(url);
      console.log("Réponse API:", response.data);

      if (response.data && Array.isArray(response.data.items)) {
        setRoles(response.data.items);
        setCurrentPage(response.data.current_page || 1);
        setLastPage(response.data.last_page || 1);
        setTotalRoles(response.data.total || response.data.items.length);
      } else {
        console.warn("Structure de données inattendue:", response.data);
        setRoles([]);
        setCurrentPage(1);
        setLastPage(1);
        setTotalRoles(0);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des rôles:", error);
      setError("Erreur lors du chargement des rôles");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && editingRole) {
        // Mode édition - mise à jour
        await axios.put(
          `http://192.168.100.14:8000/api/gosoft/roles/edit/${editingRole.id}`,
          {
            role: name,
            description: description,
          }
        );

        alert("Rôle modifié avec succès !");

        // Réinitialiser le mode édition
        setIsEditing(false);
        setEditingRole(null);
      } else {
        // Mode création
        await axios.post("http://192.168.100.14:8000/api/gosoft/roles/create", {
          role: name,
          description: description,
        });

        alert("Rôle ajouté avec succès !");
      }

      setName("");
      setDescription("");

      // Recharger les données avec la recherche actuelle
      await fetchRoles(currentPage, search);
    } catch (error) {
      console.error("Erreur lors de l'opération:", error);
      alert(
        isEditing
          ? "Erreur lors de la modification du rôle !"
          : "Erreur lors de l'ajout du rôle !"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingRole(null);
    setName("");
    setDescription("");
  };

  // Fonction pour commencer l'édition
  const handleEditRole = (role) => {
    setEditingRole(role);
    setIsEditing(true);
    setName(role.name || "");
    setDescription(role.description || "");
  };

  // Fonction pour supprimer un rôle
  const handleDeleteRole = async (role) => {
    console.log("Rôle à supprimer :", role);

    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer le rôle "${
          role.name || role.role
        }" ?`
      )
    ) {
      setLoading(true);
      try {
        await axios.delete(`http://192.168.100.14:8000/api/gosoft/roles/delete/${role.id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        alert("Rôle supprimé avec succès !");
        await fetchRoles(currentPage, search);
      } catch (error) {
        if (error.response) {
          console.error(
            "Erreur API:",
            error.response.status,
            error.response.data
          );
        } else {
          console.error("Erreur inconnue:", error.message);
        }
        alert("Erreur lors de la suppression du rôle !");
      } finally {
        setLoading(false);
      }
    }
  };

  // Charger les rôles au montage du composant
  useEffect(() => {
    fetchRoles(1, "");
  }, []);

  // Effet pour la recherche avec debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Remettre à la page 1 lors d'une nouvelle recherche
      fetchRoles(1, search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Navigation pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      fetchRoles(newPage, search);
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      const newPage = currentPage + 1;
      fetchRoles(newPage, search);
    }
  };

  // Aller à une page spécifique
  const handleGoToPage = (page) => {
    if (page >= 1 && page <= lastPage && page !== currentPage) {
      fetchRoles(page, search);
    }
  };

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(lastPage, startPage + maxPagesToShow - 1);

    // Ajuster si on est proche de la fin
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex-1 flex items-center justify-center">
        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            {isEditing ? "Modifier le Rôle" : "Ajouter un Rôle"}
          </h2>

          {isEditing && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              Mode édition : {editingRole?.name}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Nom du rôle
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du rôle"
              className="border border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-blue-300 rounded px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              disabled={loading}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded shadow transition"
            >
              {loading
                ? isEditing
                  ? "Modification..."
                  : "Ajout en cours..."
                : isEditing
                ? "Modifier"
                : "Ajouter"}
            </button>

            {isEditing && (
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
        {/* En-tête avec barre de recherche et bouton de rechargement */}
        <div className="mb-4 w-full flex gap-4">
          <input
            ref={searchInput}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un rôle dans toute la base..."
            className="flex-1 border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={() => fetchRoles(currentPage, search)}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded shadow transition"
          >
            {loading ? "..." : "Actualiser"}
          </button>
        </div>

        {/* Messages d'erreur */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Tableau des rôles */}
        <div className="w-full overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b text-left font-semibold">
                  N°
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold">
                  Nom
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold">
                  Description
                </th>
                <th className="py-3 px-4 border-b text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    Chargement des rôles...
                  </td>
                </tr>
              ) : roles.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    {search
                      ? "Aucun rôle trouvé pour cette recherche."
                      : "Aucun rôle trouvé."}
                  </td>
                </tr>
              ) : (
                roles.map((role, idx) => (
                  <tr
                    key={role.id || idx}
                    className={`hover:bg-gray-50 ${
                      editingRole?.id === role.id ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4 border-b">{role.id || "N/A"}</td>
                    <td className="py-3 px-4 border-b">{role.name || "N/A"}</td>
                    <td className="py-3 px-4 border-b">
                      {role.description || "Aucune description"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex gap-2">
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm transition"
                          title="Modifier"
                          onClick={() => handleEditRole(role)}
                          type="button"
                          disabled={loading}
                        >
                          Modifier
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                          title="Supprimer"
                          onClick={() => handleDeleteRole(role)}
                          type="button"
                          disabled={loading}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination améliorée */}
          {lastPage > 1 && (
            <div className="mt-4 flex justify-center items-center gap-2">
              {/* Bouton Précédent */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
              >
                ← Préc
              </button>

              {/* Première page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => handleGoToPage(1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    1
                  </button>
                  {currentPage > 4 && <span className="px-2">...</span>}
                </>
              )}

              {/* Pages centrales */}
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handleGoToPage(pageNum)}
                  disabled={pageNum === currentPage || loading}
                  className={`px-3 py-1 rounded transition ${
                    pageNum === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Dernière page */}
              {currentPage < lastPage - 2 && (
                <>
                  {currentPage < lastPage - 3 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => handleGoToPage(lastPage)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    {lastPage}
                  </button>
                </>
              )}

              {/* Bouton Suivant */}
              <button
                onClick={handleNextPage}
                disabled={currentPage >= lastPage || loading}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
              >
                Suiv →
              </button>
            </div>
          )}

          {/* Informations de pagination */}
          {!loading && (
            <div className="mt-2 text-sm text-gray-600 text-center">
              {search ? (
                <>
                  Résultats de recherche : Page {currentPage} sur {lastPage} (
                  {totalRoles} résultats)
                </>
              ) : (
                <>
                  Page {currentPage} sur {lastPage} ({totalRoles} rôles au
                  total)
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AjouterRole;
