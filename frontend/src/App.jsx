// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';
import AddSubjects from './AddSubjects';
import StudentDetails from './StudentDetails';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Student Management</h1>
        <nav style={{ marginBottom: '20px' ,display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
          <Link to="/add-student" style={{ marginRight: '15px' }}>Add Student</Link>
          <Link to="/students" style={{ marginRight: '15px' }}>View Students</Link>
          <Link to="/subjects">Add Subjects</Link>
        </nav>

        <Routes>
          <Route path="/add-student" element={<AddStudentForm />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/subjects" element={<AddSubjects />} />
          <Route path="/student-detail" element={<StudentDetails />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
