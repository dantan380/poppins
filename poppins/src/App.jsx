import './App.css'
import { useState } from 'react';
import FamilyProfile from './components/FamilyProfile'
import SearchBar from './components/SearchBar';
import familyFetcher from './utils/dataFetcher/familyFetcher';

function App() {
  const [families, setFamilies] = useState([]);
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (searchName) => {
    setLoading(true);
    setError(null);
    setFamilies([]);
    setSelectedFamilyId(null);
    setMembers([]);

    try {
      const fetchedFamilies = await familyFetcher.getFamilies({ familyName: searchName });
      console.log('Fetched families:', fetchedFamilies);
      if (fetchedFamilies && fetchedFamilies.length > 0) {
        setFamilies(fetchedFamilies);
      } else {
        setError('No families found with that name');
      }
    } catch (err) {
      setError('Error fetching family members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFamilySelect = async (familyId) => {
    setLoading(true);
    setError(null);
    setSelectedFamilyId(familyId);
    setMembers([]);

    try {
      const fetchedMembers = await familyFetcher.getFamilyMembers(familyId);
      console.log('Fetched members:', fetchedMembers);
      setMembers(fetchedMembers);
    } catch (err) {
      setError('Error fetching family members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      {error && <p>{error}</p>}
      {loading && <div>Loading...</div>}
      {!loading && families.length > 0 && (
        <ul>
          {families.map((family) => (
            <li key={family.id}>
              <button onClick={() => handleFamilySelect(family.id)}>
                {family.familyName} ({family.id})
              </button>
            </li>
          ))}
        </ul>
      )}
      {!loading && selectedFamilyId && (
        <FamilyProfile isLoading={loading} familyMembers={members}/>
      )}
    </div>
  );
}

export default App
