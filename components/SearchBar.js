import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchBar({ handleSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchValue(input);
    handleSearch(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchValue}
          onChange={handleChange}
        />
      </Form>
    </>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
