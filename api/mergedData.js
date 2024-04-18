import { deleteSingleMember } from './memberData';
import { deleteSingleTeam, getTeamsMembers } from './teamData';

const deleteTeamsAndMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamsMembers(teamId).then((membersArray) => {
    const deleteMembersPromises = membersArray.map((member) => deleteSingleMember(member.firebaseKey));

    Promise.all(deleteMembersPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export default deleteTeamsAndMembers;
