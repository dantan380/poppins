import { useReportKids } from "../context/ReportContext";
import { Card, CardTitle } from "../components/ui/card";
import { DatePickerForm } from "../components/DatePickerForm";

const ReportsPage = () => {
  const { kidsInReport } = useReportKids();

  return (
    <div>
      <DatePickerForm />
      {kidsInReport && kidsInReport.map(kid => (
      <Card className='w-[400px] bg-slate-100 my-10 rounded-lg drop-shadow-xl' key={kid.id}>
        <CardTitle>{kid.firstName} {kid.lastName}</CardTitle>
      </Card>
    ))}
    </div>
  );
};

export default ReportsPage;