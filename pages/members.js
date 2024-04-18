import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';

import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';
import SearchBar from '../components/SearchBar';

function ViewAllMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const [filteredMembers, setFilteredMembers] = useState([]);

  const getAllMembers = () => {
    getMembers(user.uid).then((data) => {
      setMembers(data);
      setFilteredMembers(data);
    });
  };

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchValue) => {
    const filteredSearch = members.filter((member) => (
      member.name.toLowerCase().includes(searchValue.toLowerCase()))
      || member.role.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredMembers(filteredSearch);
  };

  return (
    <>
      <h1>All Members</h1>
      <h3>Search All Members:</h3>
      <div><SearchBar handleSearch={handleSearch} /></div>
      <div className="d-flex flex-wrap">
        {filteredMembers.map((member) => (
          <MemberCard memberObj={member} key={member.firebaseKey} onUpdate={getAllMembers} />
        ))}
      </div>
    </>
  );
}

export default ViewAllMembers;
