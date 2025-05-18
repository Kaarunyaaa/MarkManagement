import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentList.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const StudentList = () => {
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  async function fetchStudents(sem) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/get-all-student/${sem}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data); // Log the response
      setStudents(response.data.student); // Update state with the correct data
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      console.log("s", e.target.value);
      fetchStudents(e.target.value);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Server error");
    }
  };

  const handleCardClick = (student) => {
    console.log(student);
    navigate("/student-detail", { state: { student } });
  };

  const handleEditStudentClick = (e, student) => {
    e.stopPropagation(); // Prevents the li onClick
    navigate("/editStudent", { state: { student } });
  };

  const handleDeleteStudentClick = async (e, student) => {
    e.stopPropagation(); // Prevents the li onClick
    const response = await axios.delete(
      `http://localhost:5000/api/admin/delete-student/${student._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Student Successfully deleted");
    fetchStudents(semester);
  };

  useEffect(() => {
    console.log(students); // Log the students state
  }, [students]);

  return (
    <div>
      <label htmlFor="semester">Select Semester:</label>
      <select
        id="semester"
        value={semester}
        onChange={(e) => {
          console.log(e), setSemester(e.target.value);
          handleChange(e);
        }}
        required
      >
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
              <li key={student.regno} onClick={() => handleCardClick(student)}>
                <p>Name: {student.name}</p>
                <p>Registration Number: {student.regno}</p>
                <p>Section: {student.section}</p>
                <p>Semester: {student.semester}</p>
                <p>Year: {student.year}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={(e) => handleEditStudentClick(e, student)}
                    style={{ marginRight: "15px" }}
                  >
                    Edit
                  </button>
                  <button onClick={(e) => handleDeleteStudentClick(e, student)}>
                    Delete
                  </button>
                </div>
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
