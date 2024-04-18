import { deleteSingleMember } from './memberData';
import { deleteSingleTeam, getSingleTeam, getTeamsMembers } from './teamData';

const deleteTeamsAndMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamsMembers(teamId).then((membersArray) => {
    const deleteMembersPromises = membersArray.map((member) => deleteSingleMember(member.firebaseKey));

    Promise.all(deleteMembersPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamsMembers(teamFirebaseKey)]).then(([teamObject, teamMembersArray]) => {
    resolve({ ...teamObject, members: teamMembersArray });
  }).catch((error) => reject(error));
});

export { deleteTeamsAndMembers, viewTeamDetails };
