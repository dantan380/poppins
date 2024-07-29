/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CheckInPage from "../pages/CheckInPage";
import { Card, CardTitle } from "../components/ui/card";
import familyFetcher from "../utils/dataFetcher/familyFetcher";
import { useState, useEffect } from "react";
import SideNavBar from "../components/SideNavBar";

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
      <div className="flex">
        <SideNavBar />
        <div className="w-full my-6 p-36 flex-grow">
          <div className="flex">
          <SearchBar onSearch={onSearch} />
          </div>
            {isLoading ? (<p>Loading...</p>
            ): (
              <>
                <CheckInPage families={families} loading={loading} error={error}/>
                {error && <p>{error}</p>}
                {recentDate && <h2>Report for latest date: {recentDate}</h2>}
                {kidsCheckedIn && kidsCheckedIn.map(kid => (
                  <Card className='w-[400px] bg-slate-100 my-10 rounded-lg drop-shadow-xl' key={kid.id}>
                    <CardTitle>{kid.firstName} {kid.lastName}</CardTitle>
                  </Card>
                ))}
              </>
            )}
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;