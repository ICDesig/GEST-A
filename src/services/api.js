// src/services/api.js
import axios from 'axios';

const API_URL = 'http://192.168.100.14:8000/api/';

// Fonction de login
export const login = async (email, password) => {
    try {
        const { data } = await axios.post(`${API_URL}/login`, { email, password });
        console.log("Réponse de l'API :", data);
        if (!data || !data.access_token) {
            throw new Error('Identifiants incorrects');
        }
        return data; // contient access_token
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

// Exemple : autre fonction API
export const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Ajoute ici d'autres appels API au besoin
