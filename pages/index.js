import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';
import { getTeams } from '../api/teamData';

export default function Home() {
  const [teams, setTeams] = useState([]);

  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>All Teams</h1>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard teamObj={team} key={team.firebaseKey} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
