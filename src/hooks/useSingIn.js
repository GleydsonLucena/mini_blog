import { signInWithEmailAndPassword } from "firebase/auth";
import { useAutentication } from "./useAutentication";
import { useNewUser } from "./useNewUser";
import { useUtils } from "../context/UtilsContext";


export const useSingIn = () => {
  const { auth, checkIfIsCancelled } = useAutentication();
  const { setLoading, setError } = useUtils();
  const { user } = useNewUser()

  const LogIn = async () => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setLoading(false);

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      let systemErrorMessage;
      if (error.message.includes("auth/wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else if (error.message.includes("auth/user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else {
        systemErrorMessage = "Houve um erro ao fazer login";
      }
      setError(systemErrorMessage);
      setLoading(false);
      console.log(error);

    }
  };
  return { LogIn };
}
