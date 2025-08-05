import React, { useState } from "react";

const initialCategories = [
    { id: 1, nom: "Courrier Arrivé" },
    { id: 2, nom: "Courrier Départ" },
];

export default function FormCategorie() {
    const [categories, setCategories] = useState(initialCategories);
    const [nom, setNom] = useState("");
    const [editId, setEditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nom.trim()) return;
        if (editId) {
            setCategories(categories.map(cat => cat.id === editId ? { ...cat, nom } : cat));
            setEditId(null);
        } else {
            setCategories([...categories, { id: Date.now(), nom }]);
        }
        setNom("");
    };

    const handleEdit = (cat) => {
        setNom(cat.nom);
        setEditId(cat.id);
    };

    const handleDelete = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
        if (editId === id) {
            setEditId(null);
            setNom("");
        }
    };

    return (
        <div className="flex gap-8 p-8 bg-gray-50 min-h-screen">
            {/* Formulaire à gauche */}
            <form
                onSubmit={handleSubmit}
                className="bg-blue-50 shadow-lg rounded-2xl p-8 w-1/3 flex flex-col gap-6 border border-blue-100"
            >
                <h2 className="text-2xl font-extrabold mb-2 text-blue-700">
                    {editId ? "Modifier la catégorie" : "Ajouter une catégorie"}
                </h2>
                <input
                    type="text"
                    placeholder="Nom de la catégorie"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    className="border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {editId ? "Modifier" : "Ajouter"}
                </button>
                {editId && (
                    <button
                        type="button"
                        onClick={() => { setEditId(null); setNom(""); }}
                        className="text-blue-500 underline text-sm self-start"
                    >
                        Annuler
                    </button>
                )}
            </form>

            {/* Tableau à droite */}
            <div className="w-2/3">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Liste des catégories de courriers</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 bg-blue-100 text-left text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-gray-200">
                                    #
                                </th>
                                <th className="px-6 py-4 bg-blue-100 text-left text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-gray-200">
                                    Nom de la catégorie
                                </th>
                                <th className="px-6 py-4 bg-blue-100 text-center text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-gray-200">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, idx) => (
                                <tr key={cat.id} className="hover:bg-blue-50 transition">
                                    <td className="px-6 py-4 border-b border-gray-100 font-medium text-gray-700">{idx + 1}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-gray-700">{cat.nom}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-500 transition font-semibold shadow"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition font-semibold shadow"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-6 text-center text-gray-400">
                                        Aucune catégorie
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}