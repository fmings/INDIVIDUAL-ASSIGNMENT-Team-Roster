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
        <div className="d-flex flex-column">
          <img src={teamDetails.logo} alt={teamDetails.team_name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          {teamDetails.team_name}
        </div>
      </div>
      <div className="text-white ms-5 details">
        <h2>Team Members</h2>
        <div className="mt-5 d-flex flex-wrap">
          {teamDetails.members?.map((member) => (
            <MemberCard memberObj={member} key={member.firebaseKey} />
          ))}
        </div>
      </div>
    </>
  );
}
