/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CheckInPage from "../pages/CheckInPage";

const Layout = ({ onSearch, families, loading, error }) => {
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <CheckInPage families={families} loading={loading} error={error}/>
      <Outlet />
    </div>
  );
};

export default Layout;