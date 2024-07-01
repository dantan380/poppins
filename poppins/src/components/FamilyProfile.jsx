/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox";
// import { useState } from "react";
import { Button } from "./ui/button";
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
      setCheckedIn([]);
      navigate('/');
    } else {
      console.error('Error during check-in:', result.error);
    }
  };

  const badgeColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500'
  }

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
  <div>
    {isLoading && <div>Loading...</div>}
    {familyMembers && familyMembers.map(member => (
      <Card className='w-[400px] bg-slate-100 my-10 rounded-lg drop-shadow-xl'key={member.id}>
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle>{member.firstName} {member.lastName}</CardTitle>
            <Badge 
              className={
                `${member.category === 'Parent' ? badgeColors.green : badgeColors.blue} w-fit` 
                }>
              {member.category}
            </Badge>
          </div>
          {member.birthdate && <CardDescription>Age: {calculateAge(member.birthdate)}</CardDescription>}
        </CardHeader>
        <CardContent className='flex flex-col'>
          {member.email && <div>Email: {member.email}</div>}
          {member.phone && <div>Phone: {member.phone}</div>}
          {member.notes && <div>Notes: {member.notes}</div>}
          {member.category === 'Parent' ? <Checkbox disabled></Checkbox> : <Checkbox onClick={() => addCheckedIn({ id: member.id })}></Checkbox>}
        </CardContent>
      </Card>
    ))}
    <Button onClick={handleCheckIn}>Check In</Button>
  </div>
)
};

export default FamilyProfile;