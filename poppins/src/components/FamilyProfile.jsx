import useFirestore from "../../hooks/useFirestore";
import { useMemo } from "react";

const FamilyProfile = () => {
  const { parentsDocs } = useFirestore();

  const data = [
    {
      firstName: 'John',
      lastName: 'Smith'
    },
    {
      firstName: 'Alice',
      lastName: 'Smith'
    }
  ];



  return (<div>hello</div>)
};

export default FamilyProfile;