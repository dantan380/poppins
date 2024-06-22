/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CheckInPage from "../pages/CheckInPage";
import { useCheckIn } from "../context/CheckInContext";
import { Button } from "../components/ui/button";

const Layout = ({ onSearch, families, loading, error }) => {
  const { checkedIn } = useCheckIn();
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <CheckInPage families={families} loading={loading} error={error}/>
      <Button onClick={() => console.log(checkedIn)}>Display CheckedIn</Button>
      <Outlet />
    </div>
  );
};

export default Layout;