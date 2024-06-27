/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CheckInPage from "../pages/CheckInPage";
import { useCheckIn } from "../context/CheckInContext";
import { Card, CardTitle } from "../components/ui/card";
import familyFetcher from "../utils/dataFetcher/familyFetcher";
import { useState, useEffect } from "react";

const Layout = ({ onSearch, families, loading, error }) => {
  const { checkedIn } = useCheckIn();
  const [kidsCheckedIn, setKidsCheckedIn] = useState([]);

  useEffect(() => {
    const fetchCheckedInKids = async () => {
      try {
        const kids = await familyFetcher.getCheckedIn(checkedIn);
        setKidsCheckedIn(kids);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCheckedInKids();
  }, [checkedIn])
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <CheckInPage families={families} loading={loading} error={error}/>
      {kidsCheckedIn && kidsCheckedIn.map(kid => (
        <Card className='w-[400px] bg-slate-100 my-10 rounded-lg drop-shadow-xl' key={kid.id}>
          <CardTitle>{kid.firstName} {kid.lastName}</CardTitle>
        </Card>
      ))}
      <Outlet />
    </div>
  );
};

export default Layout;