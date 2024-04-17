import React from 'react';
import PropTypes from 'prop-types';
import MemberCard from './MemberCard';

export default function SearchList({ results }) {
  return (
    <>
      <div className="d-flex flex-wrap">
        {results.map((result) => (
          <MemberCard memberObj={result} key={result.firebaseKey} />
        ))}
      </div>
    </>
  );
}

SearchList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired).isRequired,
};
