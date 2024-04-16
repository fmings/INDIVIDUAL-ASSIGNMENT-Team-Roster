import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MemberCard({ memberObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={memberObj.image} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <Card.Text>{memberObj.role}</Card.Text>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="secondary">Edit</Button>
        </Link>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
