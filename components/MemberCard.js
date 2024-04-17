import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSingleMember } from '../api/memberData';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';

export default function MemberCard({ memberObj, onUpdate }) {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteThisMember = () => {
    if (window.confirm(`Are you sure you want to delete ${memberObj.name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={memberObj.image} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        {teams.map((team) => (
          <Card.Title>{memberObj.team_id === team.firebaseKey ? team.team_name : ''}</Card.Title>
        ))}
        <Card.Text>{memberObj.role}</Card.Text>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="secondary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
  }).isRequired,
};
