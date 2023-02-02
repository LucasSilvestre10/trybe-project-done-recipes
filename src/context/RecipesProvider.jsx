import React, { createContext, useMemo, useState } from 'react';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [receipes, setReceipes] = useState([]);

  const values = useMemo(() => ({
    receipes,
    setReceipes,
  }), [receipes, setReceipes]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
