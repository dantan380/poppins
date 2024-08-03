import { Link, useNavigate } from "react-router-dom";
import { useCheckIn } from "../context/CheckInContext"
import familyFetcher from "../utils/dataFetcher/familyFetcher"
import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import checkmarkImage from '../assets/checkmark.png';


const CheckedInPage = () => {
  const navigate = useNavigate();
  const { checkedIn, setCheckedIn } = useCheckIn();
  const [undoneChildren, setUndoneChildren] = useState([]);
  const [childNames, setChildNames] = useState([]);

  useEffect(() => {
    const fetchChildNames = async () => {
      try{
        const result = await familyFetcher.getMembers(checkedIn);
        setChildNames(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChildNames();
  },[checkedIn]);

  const clearCheckedIn = () => {
    setCheckedIn([]);
  };

  const handleCheckInUndo = async () => {
    const result = await familyFetcher.undoCheckIn(checkedIn);
    if (result.success) {
      const undoneChildrenNames = childNames.filter(child => result.undoneChildrenIds.includes(child.id));
      setUndoneChildren(undoneChildrenNames);
      setCheckedIn([]);

      setTimeout(() => {
        navigate(-1);
      }, 100);
    } else {
      console.error('Error undoing check-in:', result.error || result.message);
    }
  }

  const formatCheckedInMessage = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (childNames.length === 0) {
      return "No Children have been checked in.";
    } else if (childNames.length === 1) {
      return (
        <span>
          You have officially checked in <strong>{childNames[0].firstName} {childNames[0].lastName}</strong> for <strong>{today}</strong>.
        </span>
      );
    } else {
      const nameString = childNames.map(child => (
        <strong key={child.id}>{child.firstName} {child.lastName}</strong>
      ));
      return (
        <span>
          You have officially checked in {nameString.reduce((prev, curr) => [prev, ', ', curr])} for {today}.
        </span>
      );
    }
  };

  // const formatUndoneMessage = () => {
  //   if (undoneChildren.length === 0) return null;

  //   const names = undoneChildren.map(child => `${child.firstName} ${child.lastName}`).join(", ");
  //   return <p>Undid check-in for <strong>{names}</strong></p>
  // }

  return (
    <div className="flex flex-row">
      <SideNavBar />
      <div className="w-full flex justify-center items-center">
        <div className="gap-y-10 flex flex-col">
          <img src={checkmarkImage}/>
          <div className="text-center">{formatCheckedInMessage()}</div>
          <div className="w-auto flex justify-center gap-2">
            <button className="bg-primary-04 py-2 rounded-3xl px-6 text-white hover:bg-primary-05 flex flex-row items-center">
              <Link onClick={clearCheckedIn} to={"/"}>Back to Check-in</Link>
            </button>
            <button className="border-primary-05 border rounded-full px-6 text-primary-05 hover:border-primary-04">
              <Link onClick={handleCheckInUndo}>Undo</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckedInPage
