/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkedIn, setCheckedIn] = useState([]);

  return (
    <CheckInContext.Provider value={{ checkedIn, setCheckedIn }}>
      {children}
    </CheckInContext.Provider>
  );
};

export const useCheckIn = () => useContext(CheckInContext);