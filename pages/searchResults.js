import React, { useEffect, useState } from 'react';
import searchMembers from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';
import SearchList from '../components/SearchList';

export default function SearchResults() {
  const [results, setResults] = useState([]);

  const { user } = useAuth();

  const handleSearch = (uid, query) => {
    searchMembers(user.uid, query).then(setResults);
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Search Results</h1>
      <div className="d-flex flex-wrap">
        <SearchList results={results} />
      </div>
    </>
  );
}
