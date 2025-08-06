import axios from 'axios';
import { API_URL } from '../../../services/api';

const apiUrl = `http://192.168.100.14:8000/api/gosoft/courriers`

/**
 * @typedef {Object} CourrierInterface
 * @property {number} [id]
 * @property {string} code
 * @property {string} type_courrier
 * @property {string} type_personne
 * @property {string} nom
 * @property {string} prenom
 * @property {string} nom_structure
 * @property {string} email
 * @property {string} phone
 * @property {number} statut
 * @property {string} texte
 * @property {any} [createdBy]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 * @property {string} [status]
 * @property {string} [image]
 */

/**
 * @typedef {Object} DryResultatInterface
 * @template T
 * @property {T} data
 * @property {string} message
 * @property {number} status
 */

/**
 * @typedef {Object} DryResultatsInterface
 * @template T
 * @property {T} data
 * @property {string} message
 * @property {number} status
 */

/**
 * Récupère tous les courriers
 * @param {Object} [paramsObj={}] - Paramètres de requête
 * @returns {Promise<DryResultatsInterface<CourrierInterface[]>>} - Promesse retournant les courriers
 */
export const getAll = async (paramsObj = {}) => {
  try {
    const response = await axios.get(apiUrl, { params: paramsObj });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Récupère un courrier par ID
 * @param {number} id - ID du courrier
 * @returns {Promise<DryResultatInterface<CourrierInterface>>} - Promesse retournant le courrier
 */
export const getById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

/**
 * Crée un courrier
 * @param {CourrierInterface} product - Courrier à créer
 * @returns {Promise<CourrierInterface>} - Promesse retournant le courrier créé
 */
export const create = async (product) => {
  try {
    const response = await axios.post(apiUrl, product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Met à jour un courrier
 * @param {number} id - ID du courrier à mettre à jour
 * @param {CourrierInterface} product - Courrier mis à jour
 * @returns {Promise<CourrierInterface>} - Promesse retournant le courrier mis à jour
 */
export const update = async (id, product) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

/**
 * Supprime un courrier
 * @param {number} id - ID du courrier à supprimer
 * @returns {Promise<void>} - Promesse indiquant la suppression du courrier
 */
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};
