import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useUtils } from '../context/UtilsContext';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const { setLoading, setError } = useUtils();
  const [documents, setDocuments] = useState([]);
  const [isComponentUnmounted, setIsComponentUnmounted] = useState(false);

  const getDocuments = async () => {
    if (isComponentUnmounted) return;
    setLoading(true);

    const collectionRef = collection(db, docCollection);

    try {
      let q;

      if (search) {
        q = query(collectionRef, where('tagsArray', 'array-contains', search), orderBy('createdAt', 'desc'));
      } else if (uid) {
        q = query(collectionRef, where('authorId', '==', uid), orderBy('createdAt', 'desc'));
      } else {
        q = query(collectionRef, orderBy('createdAt', 'desc'));
      }

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        setDocuments(
          QuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      });

      return () => unsubscribe();

    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docCollection, search, isComponentUnmounted, documents]);

  useEffect(() => {
    return () => {
      setIsComponentUnmounted(true);
    };
  }, []);

  return {
    documents,
  };
};
