import React, { useMemo } from "react";
import { ApiContext } from "./apiContext";
import AuthModule from "./modules/AuthModule";

const ApiProvider = ({ children }) => {
  const apiModules = useMemo(
    () => ({
      auth: new AuthModule(),
      //Continue adding other modules here
    }),
    [],
  );

  return (
    <ApiContext.Provider value={apiModules}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
