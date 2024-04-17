import { getMembers } from './memberData';

const searchMembers = async (uid, searchValue) => {
  const allMembers = await getMembers(uid);
  const filteredMembers = await allMembers.filter((member) => (
    member.name.toLowerCase().includes(searchValue)
    || member.role.toLowerCase().includes(searchValue)
  ));

  return { members: filteredMembers };
};

export default searchMembers;
