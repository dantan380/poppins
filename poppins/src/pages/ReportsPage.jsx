import { useState, useEffect } from "react";
import familyFetcher from "../utils/dataFetcher/familyFetcher";
import { Card, CardTitle } from "../components/ui/card";

const ReportsPage = () => {
  const [kidsInReport, setKidsInReport] = useState([]);

  const reportDate = "2024-07-05"

  useEffect(() => {
    fetchKidsInReport(reportDate);
  }, []);

  const fetchKidsInReport = async (inputDate) => {
    const result = await familyFetcher.getCheckedInWithDate(inputDate);

    if (result.success) {
      setKidsInReport(result.checkedInChildrenDocs)
    }
  };

  return (
    <div>
      {kidsInReport && kidsInReport.map(kid => (
      <Card className='w-[400px] bg-slate-100 my-10 rounded-lg drop-shadow-xl' key={kid.id}>
        <CardTitle>{kid.firstName} {kid.lastName}</CardTitle>
      </Card>
    ))}
    </div>
  );
};

export default ReportsPage;