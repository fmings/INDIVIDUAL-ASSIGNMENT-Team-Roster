import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';

const initialState = {
  name: '',
  image: '',
  role: '',
};

export default function MemberForm({ memberObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

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
      updateMember(formInput).then(() => router.push(`/member/${memberObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <>
        <FloatingLabel
          controlId="floatingInput"
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
          controlId="floatingInput"
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
        <Form.Select
          aria-label="Role Selector"
          name="role"
          onChange={handleChange}
          value={formInput.role}
          required
        >
          <option>Select Role</option>
          <option value="Forward">Forward</option>
          <option value="Defenseman">Defenseman</option>
          <option value="Goalie">Goalie</option>
        </Form.Select>
      </>
      <Button type="submit">{memberObj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  memberObj: initialState,
};
