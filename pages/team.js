import { useEffect, useState } from 'react';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';

function ViewTeamCards() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard memberObj={member} key={member.firebaseKey} onUpdate={getAllMembers} />
        ))}
      </div>
    </>
  );
}

export default ViewTeamCards;
