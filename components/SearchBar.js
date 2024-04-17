import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import searchMembers from '../api/mergedData';

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const search = (value) => {
    searchMembers(value).then(({ results }) => {
      setResults(results);
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    search(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/searchResults');
    search(query);
  };

  return (
    <>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={query}
          onChange={handleChange}
        />
        <Button variant="outline-success" type="submit">Search</Button>
      </Form>
    </>
  );
}

SearchBar.propTypes = {
  setResults: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};
