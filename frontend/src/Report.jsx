import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Report = () => {
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);
  const [
    semesterForSubjectWisePerformance,
    setsemesterForSubjectWisePerformance,
  ] = useState("");
  const [semesterWisePerformance, setSemesterWisePerformance] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [subjectWisePerformance, setSubjectWisePerformance] = useState({});
  const [sgpa, setSgpa] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const student = location.state?.student;

  const fetchTopPerformers = async (selectedSemester) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getTop-Performers",
        {
          params: {
            semester: selectedSemester,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setStudents(response.data.getTopPerformers);
      console.log(response.data.getTopPerformers);
    } catch (error) {
      console.error("Error fetching semester marks or SGPA:", error);
    }
  };

  const fetchSemesterWiseSubjects = async (sem) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-subject-bySemNo",
        {
          params: {
            semester: sem,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    fetchTopPerformers(selectedSemester);
  };

  const handleSubjectWiseSemesterChange = (e) => {
    try {
      const sem = e.target.value;
      setsemesterForSubjectWisePerformance(sem);
      fetchSemesterWiseSubjects(sem);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubjectChange = async (e) => {
    try {
      setSubject(e.target.value);
      const res = await axios.get(
        "http://localhost:5000/api/admin/getSubjectWisePerformance",
        {
          params: {
            semester: semesterForSubjectWisePerformance,
            subject: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setSubjectWisePerformance(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSemesterWisePerformance = async (e) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-performance",
        {
          params: {
            semester: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setSemesterWisePerformance(response.data);
    } catch (error) {}
  };

  return (
    <div className="container">
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {/* Top Performers Card */}
        <div style={cardStyle}>
          <center><h2>Top Performers</h2></center>
          <select
            id="semester"
            value={semester}
            onChange={handleSemesterChange}
            required
            
          >
            <option value="">Semester</option>
            {[...Array(8).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>

          {students.length > 0 ? (
            <table border="1" style={{ marginTop: "1rem", width: "100%" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SGPA</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.student.name}</td>
                    <td>{student.sgpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students found</p>
          )}
        </div>

        {/* Subject Wise Performers Card */}
        <div style={cardStyle}>
          <center><h2>Subject Wise Performers</h2></center>
          <select
            id="semesterForSubjectWisePerformance"
            value={semesterForSubjectWisePerformance}
            onChange={handleSubjectWiseSemesterChange}
            required
          >
            <option value="">Semester</option>
            {[...Array(8).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <select
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            required
          >
            <option value="">Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject.subject}>
                {subject.subject}
              </option>
            ))}
          </select>
          {Object.keys(subjectWisePerformance).length>0?(<div><h5>Subject Average: {subjectWisePerformance.SubjectAverage}</h5>
          <h5>
            No. of students above avg:{" "}
            {subjectWisePerformance.AboveAverageCount}
          </h5>
          <h5>
            No. of students below avg:{" "}
            {subjectWisePerformance.BelowAverageCount}
          </h5></div>):(<p>No Results Available</p>)}
        </div>

        {/* Semester Wise Performance Card */}
        <div style={cardStyle}>
          <center><h2>Semester Wise Performance</h2></center>
          <select
            id="SemesterWisePerformance"
            onChange={handleSemesterWisePerformance}
            required
          >
            <option value="">Semester</option>
            {[...Array(8).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          {Object.keys(semesterWisePerformance).length>0  ?(<div><h5>Semester Average: {semesterWisePerformance.semesterAverage}</h5>
          <h5>
            No. of students above avg:{" "}
            {semesterWisePerformance.AboveAverageCount}
          </h5>
          <h5>
            No. of students below avg:{" "}
            {semesterWisePerformance.BelowAverageCount}
          </h5></div>):(<p>No Results Found</p>)}
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "1rem",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  flex: "1 1 calc(33.33% - 2rem)",
  minWidth: "280px",
  boxSizing: "border-box",
};



export default Report;
