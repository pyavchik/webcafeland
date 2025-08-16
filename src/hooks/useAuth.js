import { useState, useEffect } from 'react';
import { onAuthChange } from '../services/auth';

/**
 * Custom hook for managing authentication state
 * @returns {Object} Authentication state and loading status
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(authUser => {
      setUser(authUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
};

export default useAuth;
