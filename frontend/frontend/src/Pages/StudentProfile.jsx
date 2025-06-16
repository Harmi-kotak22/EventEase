import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import api from '../Api';

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #007bff;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ProfilePopup = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  padding: 20px;
  z-index: 1000;
  width: 250px;
`;

function StudentProfile() {
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/students/me', {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      setStudent(response.data);
    } catch (err) {
      console.error("Error fetching student:", err);
    }
  };

  const handleClick = () => {
    if (!show) {
      fetchStudent();
    }
    setShow(!show);
  };

  return (
    <div style={{ position: 'relative', marginRight: '20px' }}>
      <ProfileIcon onClick={handleClick}>
        {student?.name?.charAt(0).toUpperCase() || 'P'}
      </ProfileIcon>

      {show && student && (
        <ProfilePopup>
          <h3>Profile</h3>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Username:</strong> {student.username}</p>
          <p><strong>Roll No:</strong> {student.rollNumber}</p>
          <p><strong>Email:</strong> {student.email}</p>
        </ProfilePopup>
      )}
    </div>
  );
}

export default StudentProfile;
