import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge"
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

  const badgeColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500'
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
          <CardDescription>{member.birthdate}</CardDescription>
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