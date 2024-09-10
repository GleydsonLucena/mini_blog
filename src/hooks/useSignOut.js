import { signOut } from "firebase/auth";
import { useAutentication } from "./useAutentication";


export const useSignOut = () => {
  const { auth, checkIfIsCancelled } = useAutentication();

  const logOut = async () => {

    checkIfIsCancelled();
    signOut(auth);
  };
  return { logOut };
}
