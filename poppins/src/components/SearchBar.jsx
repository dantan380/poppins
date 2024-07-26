/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

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