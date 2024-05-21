/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge"
// import { useEffect, useState } from "react";

const FamilyProfile = ({ isLoading, familyMembers }) => {
  // const [familyMembers, setFamilyMembers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  
  // useEffect(() => {
  //   const fetchData = async () => { 
  //     try {
  //       const data = await familyFetcher.getFamilyMembers({familyName: "Smith"})
  //       setFamilyMembers(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
      <Card className='w-[400px] bg-slate-100 my-10 rounded-xl drop-shadow-xl'key={member.id}>
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
        </CardContent>
      </Card>
    ))}
  </div>
)
};

export default FamilyProfile;