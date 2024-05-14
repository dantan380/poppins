import useFirestore from "../../hooks/useFirestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";


const FamilyProfile = () => {
  const { parentsDocs, kidsDocs, familiesDocs } = useFirestore();
  console.log(parentsDocs, kidsDocs, familiesDocs);

  return (
  <div>
    {parentsDocs && parentsDocs.map(parent => (
      <Card class="w-[400px] bg-gray-100 rounded-lg my-10 drop-shadow-lg" key={parent.id}>
        <CardHeader>
          <div>
            <CardTitle>{parent.firstName} {parent.lastName}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p>{parent.email}</p>
          <p>{parent.phone}</p>
        </CardContent>
      </Card>
    ))}
    {kidsDocs && kidsDocs.map(kid => (
      <Card class="w-[400px] bg-gray-100 rounded-lg my-10 drop-shadow-lg" key={parent.id}>
        <CardHeader>
          <div>
            <CardTitle>{kid.firstName} {kid.lastName}</CardTitle>
            <CardDescription>{kid.birthdate}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p>{kid.notes}</p>
        </CardContent>
      </Card>
    ))}
    
  </div>
)
};

export default FamilyProfile;