import React from "react";

import { useState } from "react";
import { createContext } from "react";

export const addData = createContext();
export const updateData = createContext();
export const dltData = createContext();
export const contactId=createContext();

const ContextProvider = ({ children }) => {
  const [useradd, setUseradd] = useState("");
  const [update, setUpdate] = useState("");
  const [deleteData, setDeleteData] = useState("");
 
  return (
    <React.Fragment>
      <addData.Provider value={{ useradd, setUseradd }}>
        <updateData.Provider value={{ update, setUpdate }}>
          <dltData.Provider value={{ deleteData, setDeleteData }}>
            {children}
          </dltData.Provider>
        </updateData.Provider>
      </addData.Provider>
      
    </React.Fragment>
  );
};

export default ContextProvider;
