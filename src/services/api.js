// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/gosoft/';

// Enregistrement d'un courrier physique
export const submitCourrierPhysique = async (formData) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.post(`${API_URL}/courriers/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Affiche les détails dans la console
    console.error("Erreur API (submitCourrierPhysique):", error.response || error);
    // Rejette l'erreur pour que React puisse la gérer dans le formulaire
    throw error;
  }
};
