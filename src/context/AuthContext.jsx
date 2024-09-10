import PropTypes from "prop-types";
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object,
};
