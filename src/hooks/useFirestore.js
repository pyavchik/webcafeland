import { useState, useEffect } from 'react';
import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  subscribeToCollection,
} from '../services/firestore';

/**
 * Custom hook for Firestore operations
 * @param {string} collectionName - Name of the Firestore collection
 * @param {Object} options - Query options
 * @returns {Object} Documents, loading state, and CRUD operations
 */
const useFirestore = (collectionName, options = {}) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName) {
      setLoading(false);
      return;
    }

    // Use real-time subscription if enabled
    if (options.realtime) {
      const unsubscribe = subscribeToCollection(
        collectionName,
        result => {
          if (result.success) {
            setDocuments(result.data);
            setError(null);
          } else {
            setError(result.error);
          }
          setLoading(false);
        },
        options
      );

      return () => unsubscribe();
    } else {
      // One-time fetch
      const fetchDocuments = async () => {
        setLoading(true);
        const result = await getDocuments(collectionName, options);

        if (result.success) {
          setDocuments(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
        setLoading(false);
      };

      fetchDocuments();
    }
  }, [collectionName, options.realtime]);

  const add = async data => {
    const result = await addDocument(collectionName, data);
    if (result.success && !options.realtime) {
      setDocuments(prev => [...prev, result.data]);
    }
    return result;
  };

  const update = async (docId, data) => {
    const result = await updateDocument(collectionName, docId, data);
    if (result.success && !options.realtime) {
      setDocuments(prev =>
        prev.map(doc => (doc.id === docId ? { ...doc, ...data } : doc))
      );
    }
    return result;
  };

  const remove = async docId => {
    const result = await deleteDocument(collectionName, docId);
    if (result.success && !options.realtime) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    }
    return result;
  };

  return {
    documents,
    loading,
    error,
    add,
    update,
    remove,
  };
};

export default useFirestore;
