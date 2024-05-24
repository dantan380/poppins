/* eslint-disable react/prop-types */
import './App.css'
import { useState } from 'react';
import Layout from './layouts/Layout';
import familyFetcher from './utils/dataFetcher/familyFetcher';

function App() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchName) => {
    setLoading(true);
    setError(null);
    setFamilies([]);

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

  return (
    <Layout onSearch={handleSearch} families={families} loading={loading} error={error} ></Layout>
  );
}

export default App;