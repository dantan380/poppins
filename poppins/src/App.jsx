/* eslint-disable react/prop-types */
import './App.css'
import { useCallback, useRef, useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import familyFetcher from './utils/dataFetcher/familyFetcher';
import { debounce } from 'lodash';

function App() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const minLoadingTime = 500;
  const timerRef = useRef(null);

  const performSearch = useCallback(async (searchTerm) => {
    if (searchTerm.length === 0) {
      setFamilies([]);
      setError(null);
      return;
    }

    const startTime = Date.now();

    try {
      console.log('Searching for:', searchTerm);
      const fetchedFamilies = await familyFetcher.getFamilies({ familyName: searchTerm });
      console.log('Fetched families:', fetchedFamilies);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        setFamilies(fetchedFamilies);
        setLoading(false);
        if (fetchedFamilies.length === 0) {
          setError('No families found with that name');
        } else {
          setError(null);
        }
      }, remainingTime)
      
    } catch (err) {
      setError('Error fetching family members');
      console.error(err);
    }
  }, [minLoadingTime]);

  const debouncedSearch = useCallback(
    debounce((searchName) => {
      setLoading(true);
      performSearch(searchName);
    }, 300),
    [performSearch]
  );

  useEffect(() => {
    if (searchTerm.length > 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        debouncedSearch(searchTerm);
      }, 300);
    } else {
      setFamilies([]);
      setError(null);
      setLoading(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchTerm, debouncedSearch]);

  const handleSearch = (searchName) => {
    setSearchTerm(searchName)
  };

  return (
    <Layout onSearch={handleSearch} families={families} loading={loading} error={error} ></Layout>
  );
}

export default App;