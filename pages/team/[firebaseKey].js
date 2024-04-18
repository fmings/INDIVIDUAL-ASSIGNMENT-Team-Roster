import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <img src={teamDetails.logo} alt={teamDetails.team_name} style={{ width: '100px' }} />
        <div className="ms-5 details">
          <h1 className="details-name">{teamDetails.team_name}</h1>
          <p>{teamDetails.city}, {teamDetails.state}</p>
        </div>
      </div>
      <div className="ms-5 details">
        <h3>Team Members</h3>
        <div className="d-flex flex-wrap">
          {teamDetails.members?.map((member) => (
            <MemberCard memberObj={member} key={member.firebaseKey} />
          ))}
        </div>
      </div>
    </>
  );
}
