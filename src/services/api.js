// src/services/api.js
import axios from 'axios';

export const API_URL = 'http://192.168.100.14:8000/api/gosoft';

// ✅ Enregistrement d'un courrier physique (avec token)
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
    console.error("Erreur API (submitCourrierPhysique):", error.response || error);
    throw error;
  }
};

// Les autres fonctions CRUD sans token
export const getAllCourriers = async () => {
  const response = await axios.get(`${API_URL}/courriers`);
  return response.data;
};

export const getCourrierById = async (id) => {
  const response = await axios.get(`${API_URL}/courriers/${id}`);
  return response.data;
};

export const updateCourrier = async (id, formData) => {
  const response = await axios.post(`${API_URL}/courriers/update/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteCourrier = async (id) => {
  const response = await axios.delete(`${API_URL}/courriers/delete/${id}`);
  return response.data;
};
