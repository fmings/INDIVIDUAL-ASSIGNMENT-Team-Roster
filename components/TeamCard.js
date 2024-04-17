import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export default function TeamCard({ teamObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={teamObj.logo} />
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <Card.Text>{teamObj.city}, {teamObj.state}</Card.Text>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="secondary">Edit</Button>
        </Link>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};
