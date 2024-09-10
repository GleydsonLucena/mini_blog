import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const UtilsContext = createContext();

export const UtilsContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <UtilsContext.Provider
      value={{
        error,
        setError,
        loading,
        setLoading,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUtils = () => {
  return useContext(UtilsContext);
};

UtilsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
