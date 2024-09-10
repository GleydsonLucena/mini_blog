import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useUtils } from "../context/UtilsContext";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const { setLoading, setError } = useUtils();
  const [isComponentUnmounted, setIsComponentUnmounted] = useState(false);

  const getDocument = async () => {
    if (isComponentUnmounted) return;
    setLoading(true);

    try {
      const docRef = await doc(db, docCollection, id);
      const docSnap = await getDoc(docRef);
      setDocument(docSnap.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docCollection, id, isComponentUnmounted]);

  useEffect(() => {
    return () => {
      setIsComponentUnmounted(true);
    };
  }, []);


  return {
    document,
  };
}
