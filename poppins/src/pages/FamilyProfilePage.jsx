import familyFetcher from "../utils/dataFetcher/familyFetcher";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FamilyProfile from "../components/FamilyProfile";
import SideNavBar from "../components/SideNavBar";


const FamilyProfilePage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { familyId } = useParams();
  console.log('familyId:', familyId);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await familyFetcher.getFamilyMembers(familyId);
        console.log('Fetched members:', fetchedMembers);
        setMembers(fetchedMembers);
      } catch (err) {
        setError('Error fetching family members');
        console.error(error, err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [familyId]);

  return (
    <div className="flex">
      <SideNavBar />
      <FamilyProfile isLoading={loading} familyMembers={members} />
    </div>
  );
};

export default FamilyProfilePage;