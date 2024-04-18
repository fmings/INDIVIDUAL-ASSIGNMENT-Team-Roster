import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  role: '',
  firebaseKey: '',
};

export default function MemberForm({ memberObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (memberObj.firebaseKey) {
      setFormInput(memberObj);
    }
  }, [memberObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberObj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/members'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/members');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <>
        <FloatingLabel
          controlId="floatingInput1"
          label="First & Last Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="First & Last Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput2"
          label="Image URL"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel className="form-field" controlId="floatingSelect" label="Role">
          <Form.Select
            aria-label="Role Selector"
            name="role"
            onChange={handleChange}
            value={formInput.role}
            required
          >
            <option value="">Select Role</option>
            <option key="Forward" value="Forward">Forward</option>
            <option key="Defenseman" value="Defenseman">Defenseman</option>
            <option key="Goalie" value="Goalie">Goalie</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel className="form-field" controlId="floatingSelect2" label="Team">
          <Form.Select
            aria-label="Team Selector"
            name="team_id"
            onChange={handleChange}
            value={formInput.team_id}
            required
          >
            <option value="">Select Team</option>
            {
              teams.map((team) => (
                <option
                  key={team.firebaseKey}
                  value={team.firebaseKey}
                >
                  {team.team_name}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>
      </>
      <Button variant="dark" type="submit">{memberObj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  memberObj: initialState,
};
