/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ onSearch }) => {
  const [familyName, setFamilyName] = useState('')

  useEffect(() => {
    if (familyName.length > 0) {
      onSearch(familyName);
    }
  }, [familyName, onSearch]);


  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setFamilyName(newValue);
    onSearch(newValue);
  };

  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full mt-10">
      <form className="w-5/6">
      <div>{formattedDate}</div>
        <div className="flex flex-row justify-between my-5">
          <h1 className="text-4xl font-medium">Check-in</h1>
          <button className="bg-primary-04 rounded-3xl px-6 text-white hover:bg-primary-05 flex flex-row items-center">
            <IoIosAdd className="text-3xl"/>
            <Link to={'/createFamily'}>New Family</Link>
          </button>
        </div>
        <p className="my-2">Search by name to check-in participants</p>
        <div className="relative flex items-center">
          <FaMagnifyingGlass className="text-xl absolute ml-7"/>
          <input
          type="text"
          value={familyName}
          onChange={handleInputChange}
          className="border-slate-600 border-2 rounded-full py-1 pr-3 pl-16 w-full h-16 text-xl"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;