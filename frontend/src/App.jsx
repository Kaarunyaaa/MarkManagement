import React from "react";
import { Routes, Route } from "react-router-dom";
import AddStudentForm from "./AddStudentForm";
import StudentList from "./StudentList";
import AddSubjects from "./AddSubjects";
import StudentDetails from "./StudentDetails";
import EditMark from "./EditMark";
import AddMark from "./AddMark";
import EditStudent from "./EditStudent";
import Login from "./Login";
import AdminHome from "./AdminHome";
import StudentHome from "./StudentHome";
import Report from "./Report";
import { useAuth } from "./AuthContext";

const App = () => {
  const auth = useAuth();

  return (
    <Routes>
      {auth.role == "student" ? (
        <>
          <Route path="/" element={<StudentHome />} />
          <Route path="/login" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/" element={<AdminHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-student" element={<AddStudentForm />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/subjects" element={<AddSubjects />} />
          <Route path="/student-detail" element={<StudentDetails />} />
          <Route path="/addMark" element={<AddMark />} />
          <Route path="/editMark" element={<EditMark />} />
          <Route path="/editStudent" element={<EditStudent />} />
          <Route path="/reports" element={<Report/>} />
        </>
      )}
    </Routes>
  );
};

export default App;
