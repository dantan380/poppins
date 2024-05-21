/* eslint-disable react/prop-types */
import { useState } from "react"

const SearchBar = ({ onSearch }) => {
  const [familyName, setFamilyName] = useState('')


  const handleInputChange = (e) => {
    setFamilyName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(familyName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={familyName}
          onChange={handleInputChange}
          placeholder="Enter family/last name"
          />
          <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;