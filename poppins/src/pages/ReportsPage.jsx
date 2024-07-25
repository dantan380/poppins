import { useReportKids } from "../context/ReportContext";
import { Card, CardTitle } from "../components/ui/card";
import { DatePickerForm } from "../components/DatePickerForm";
import SideNavBar from "../components/SideNavBar";

const ReportsPage = () => {
  const { kidsInReport } = useReportKids();

  return (
    <div className="flex flex-row">
      <SideNavBar />
      <div>
        <DatePickerForm />
        {kidsInReport && kidsInReport.map(kid => (
        <Card className='w-[400px] bg-slate-100 my-10 rounded-lg drop-shadow-xl' key={kid.id}>
          <CardTitle>{kid.firstName} {kid.lastName}</CardTitle>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;