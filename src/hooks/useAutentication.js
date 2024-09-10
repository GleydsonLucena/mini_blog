/* eslint-disable no-unused-vars */
import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { useUtils } from "../context/UtilsContext";

export const useAutentication = () => {
  const [cancelled, setCancelled] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { setLoading } = useUtils();

  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );


      await updateProfile(user, {
        displayName: data.name,
      });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "Senha precisa ter entre 6 e 12 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Este e-mail já está cadastrado";
      } else {
        systemErrorMessage = "Houve um erro ao cadastrar";
      }
      setAuthError(systemErrorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    authError,
    checkIfIsCancelled,
  };
};
