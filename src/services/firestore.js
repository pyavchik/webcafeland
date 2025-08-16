// Firestore database service
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Add a new document to a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} data - Data to add
 * @returns {Promise<Object>} Document reference or error
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
      data: { ...data, id: docRef.id },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get a document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise<Object>} Document data or error
 */
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        data: { id: docSnap.id, ...docSnap.data() },
      };
    } else {
      return {
        success: false,
        error: 'Document not found',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Array of documents or error
 */
export const getDocuments = async (collectionName, options = {}) => {
  try {
    const {
      where: whereClause,
      orderByField,
      orderDirection,
      limitCount,
    } = options;

    let q = collection(db, collectionName);

    // Add where clause
    if (whereClause) {
      q = query(
        q,
        where(whereClause.field, whereClause.operator, whereClause.value)
      );
    }

    // Add order by
    if (orderByField) {
      q = query(q, orderBy(orderByField, orderDirection || 'asc'));
    }

    // Add limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: documents,
      count: documents.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Update a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Success or error
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { id: docId, ...data },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise<Object>} Success or error
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);

    return {
      success: true,
      id: docId,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Listen to real-time updates for a collection
 * @param {string} collectionName - Name of the collection
 * @param {Function} callback - Callback function to handle updates
 * @param {Object} options - Query options
 * @returns {Function} Unsubscribe function
 */
export const subscribeToCollection = (
  collectionName,
  callback,
  options = {}
) => {
  const {
    where: whereClause,
    orderByField,
    orderDirection,
    limitCount,
  } = options;

  let q = collection(db, collectionName);

  // Add where clause
  if (whereClause) {
    q = query(
      q,
      where(whereClause.field, whereClause.operator, whereClause.value)
    );
  }

  // Add order by
  if (orderByField) {
    q = query(q, orderBy(orderByField, orderDirection || 'asc'));
  }

  // Add limit
  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  return onSnapshot(q, querySnapshot => {
    const documents = [];
    querySnapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    callback({
      success: true,
      data: documents,
      count: documents.length,
    });
  });
};

/**
 * Listen to real-time updates for a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {Function} callback - Callback function to handle updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToDocument = (collectionName, docId, callback) => {
  const docRef = doc(db, collectionName, docId);

  return onSnapshot(docRef, docSnap => {
    if (docSnap.exists()) {
      callback({
        success: true,
        data: { id: docSnap.id, ...docSnap.data() },
      });
    } else {
      callback({
        success: false,
        error: 'Document not found',
      });
    }
  });
};
