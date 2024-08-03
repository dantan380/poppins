/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox";
import { useCheckIn } from "../context/CheckInContext";
import { useNavigate } from "react-router-dom";
import familyFetcher from "../utils/dataFetcher/familyFetcher";

const FamilyProfile = ({ isLoading, familyMembers }) => {
  const { checkedIn, setCheckedIn } = useCheckIn();
  const navigate = useNavigate();

  const addCheckedIn = (member) => {
    setCheckedIn(prevCheckedIn => [
      ...prevCheckedIn,
      //Ideally, call firebase function to create 'checked-in' document with this info.
      { id: member.id }
    ]);
    console.log(checkedIn);
  };

  const handleCheckIn = async () => {
    const result = await familyFetcher.checkInChildren(checkedIn);
    if (result.success) {
      console.log(`Check-in completed for ${result.checkedInChildren.length} children on ${result.date}`);
      navigate('/checkedInSummary');
    } else {
      console.error('Error during check-in:', result.error);
    }
  };


  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!familyMembers || familyMembers.length === 0) {
    return <div>No family members found</div>;
  }

  return (
  <div className="w-full flex flex-col justify-center items-center">
  <div className="gap-y-5 flex flex-col items-center w-2/3">
    {isLoading && <div>Loading...</div>}
    {familyMembers && familyMembers.map(member => (
      <Card className={`${member.category === 'Parent' ? 'bg-white' : 'bg-primary-02'} w-full rounded-3xl border-primary-03`}key={member.id}>
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle>{member.firstName} {member.lastName}</CardTitle>
            <Badge 
              variant="secondary"
              className="w-fit bg-primary-03 text-primary-04">
              {member.category}
            </Badge>
          </div>
          {member.birthdate && <CardDescription>Age: {calculateAge(member.birthdate)}</CardDescription>}
        </CardHeader>
        <CardContent className='flex flex-col'>
          {member.phone && <div>Phone: {member.phone}</div>}
          {member.notes && <div>Notes: {member.notes}</div>}
          {member.category === 'Parent' ? <Checkbox disabled></Checkbox> : <Checkbox onClick={() => addCheckedIn({ id: member.id })}></Checkbox>}
        </CardContent>
      </Card>
    ))}
  </div>
  <div className="w-2/3 flex justify-start mt-5">
    <button className="w-fit bg-primary-04 rounded-3xl px-6 py-2 text-white hover:bg-primary-05 flex flex-row items-center" onClick={handleCheckIn}>Check in</button>
  </div>
  </div>
)
};

export default FamilyProfile;