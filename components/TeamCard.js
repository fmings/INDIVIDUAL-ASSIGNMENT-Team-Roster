import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteTeamsAndMembers } from '../api/mergedData';
import { updateTeam } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';

export default function TeamCard({ teamObj, onUpdate }) {
  const { user } = useAuth();

  const togglePublic = () => {
    if (teamObj.public) {
      updateTeam({ ...teamObj, public: false }).then(() => onUpdate());
    } else {
      updateTeam({ ...teamObj, public: true }).then(() => onUpdate());
    }
  };

  const deleteThisTeam = () => {
    if (window.confirm(`Are you sure you want to delete Team ${teamObj.team_name} and all of it's members?`)) {
      deleteTeamsAndMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="object-card" style={{ width: '18rem' }}>
      <Card.Img className="card-image" variant="top" src={teamObj.logo} />
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <Button variant="light" className="m-2" onClick={togglePublic}>{teamObj.public ? '🌎' : '🔒'}</Button>
        <Card.Text>{teamObj.city}, {teamObj.state}</Card.Text>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="dark">View</Button>
        </Link>
        {teamObj.uid === user.uid
          ? (
            <>
              <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
                <Button className="button" variant="secondary">Edit</Button>
              </Link>
              <Button className="button" variant="danger" onClick={deleteThisTeam}>Delete</Button>
            </>
          )
          : '' }
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
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
