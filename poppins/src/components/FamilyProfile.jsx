import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import familyFetcher from "../utils/dataFetcher/familyFetcher";
import { useEffect, useState } from "react";

const FamilyProfile = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const data = await familyFetcher.getFamilyMembers({familyName: "Smith"})
        setFamilyMembers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
  <div>
    {isLoading && <div>Loading...</div>}
    {familyMembers && familyMembers.map(member => (
      <Card className='w-[400px] bg-slate-200 my-10 rounded-xl drop-shadow-xl'key={member.id}>
        <CardHeader>
          <CardTitle>{member.firstName} {member.lastName}</CardTitle>
          <div>{member.category}</div>
          <CardDescription>{member.birthdate}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col'>
          <div>{member.email}</div>
          <div>{member.phone}</div>
          <div>{member.notes}</div>
        </CardContent>
      </Card>
    ))}
  </div>
)
};

export default FamilyProfile;