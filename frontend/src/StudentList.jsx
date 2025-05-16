import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentList.css';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [semester, setSemester] = useState('');
  const [students, setStudents] = useState([]);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("s",e.target.value);
      const response = await axios.get(`http://localhost:5000/api/admin/get-all-student/${e.target.value}`);
      console.log(response.data); // Log the response
      setStudents(response.data.student); // Update state with the correct data
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Server error');
    }
  };

  const handleCardClick=async(student)=>{
    console.log(student);
    navigate('/student-detail', { state: { student } });

  }

  useEffect(() => {
    console.log(students); // Log the students state
  }, [students]);

  return (
    <div>
      
        <label htmlFor="semester">Select Semester:</label>
        <select id="semester" value={semester} onChange={(e) => {console.log(e),setSemester(e.target.value);handleSubmit(e)}} required>
          <option value="">Select</option>
          {[...Array(8).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

      
      <div>
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student.regno} onClick={(e)=>{handleCardClick(student)}}>
                <p>Name: {student.name}</p>
                <p>Registration Number: {student.regno}</p>
                <p>Section: {student.section}</p>
                <p>Semester: {student.semester}</p>
                <p>Year: {student.year}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found for the selected semester.</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
