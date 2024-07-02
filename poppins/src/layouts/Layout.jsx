/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CheckInPage from "../pages/CheckInPage";
import { Card, CardTitle } from "../components/ui/card";
import familyFetcher from "../utils/dataFetcher/familyFetcher";
import { useState, useEffect } from "react";

const Layout = ({ onSearch, families, loading, error }) => {
  const [recentDate, setRecentDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [kidsCheckedIn, setKidsCheckedIn] = useState([]);

  useEffect(() => {
    fetchCheckedInChildren();
  }, []);

  const fetchCheckedInChildren = async () => {
    setIsLoading(true);
    
    const result = await familyFetcher.getCheckedIn();

    if (result.success) {
      setKidsCheckedIn(result.checkedInChildrenDocs);
      setRecentDate(result.date);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <CheckInPage families={families} loading={loading} error={error}/>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {recentDate && <h2>Report for {recentDate}</h2>}
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