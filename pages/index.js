import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';

import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

function Home() {
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
      <h1>All Members</h1>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard memberObj={member} key={member.firebaseKey} onUpdate={getAllMembers} />
        ))}
      </div>
    </>
  );
}

export default Home;
