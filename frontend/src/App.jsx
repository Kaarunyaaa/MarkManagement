// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';
import AddSubjects from './AddSubjects';
import StudentDetails from './StudentDetails';
import EditMark from './EditMark';
import AddMark from './AddMark';
import EditStudent from './EditStudent';
import Login from './Login';
import AdminHome from './AdminHome';
import { useAuth } from './AuthContext';

const App = () => {
  
  return (
    <Router>
      <div>
        

        <Routes>
          <Route path="/" element={<AdminHome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-student" element={<AddStudentForm />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/subjects" element={<AddSubjects />} />
          <Route path="/student-detail" element={<StudentDetails />} />
          <Route path="/addMark" element={<AddMark/>}/>
          <Route path="/editMark" element={<EditMark/>}/>
          <Route path="/editStudent" element={<EditStudent/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
