import { useState, useEffect } from 'react';
import {
  getAllCourriers as fetchCourriers,
  submitCourrierPhysique as sendCourrier,
  updateCourrier as updateCourrierApi,
  deleteCourrier as deleteCourrierApi
} from '../../../services/api';

export const useCourriers = () => {
  const [courriers, setCourriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllCourriers = async () => {
    try {
      setLoading(true);
      const data = await fetchCourriers();
      console.log("Liste de courriels: ", data);
      // Assurez-vous que data.items est un tableau avant de le définir dans l'état
      setCourriers(Array.isArray(data.items) ? data.items : []);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const createCourrier = async (formData) => {
    try {
      setLoading(true);
      await sendCourrier(formData);
      await fetchAllCourriers();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateCourrier = async (id, formData) => {
    try {
      setLoading(true);
      await updateCourrierApi(id, formData);
      await fetchAllCourriers();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteCourrier = async (id) => {
    try {
      setLoading(true);
      await deleteCourrierApi(id);
      await fetchAllCourriers();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourriers();
  }, []);

  return { courriers, loading, error, createCourrier, updateCourrier, deleteCourrier };
};
