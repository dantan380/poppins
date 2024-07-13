/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [kidsInReport, setKidsInReport] = useState([]);

  return (
    <ReportContext.Provider value={{ kidsInReport, setKidsInReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportKids = () => useContext(ReportContext);