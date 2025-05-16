import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Functional component that accepts a 'name' prop
const StudentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;
  return (
    <div>
      <h2>Welcome {student.name}</h2>
    </div>
  );
};

export default StudentDetails;
