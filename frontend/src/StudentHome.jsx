import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

const StudentHome = () => {
  const auth = useAuth();
  console.log(auth);
  const [semester, setSemester] = useState();
  const [marks, setMarks] = useState([]);
  const [sgpa, setSGPA] = useState("");

  const handleChange = async (e) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/student/getSemMarks",
        {
          params: {
            semester: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setMarks(response.data);
      const sgpaResponse = await axios.get(
        "http://localhost:5000/api/student/get-sgpa",
        {
          params: {
            student_id: auth.user.id,
            semester: e.target.value,
          },
        }
      );
      setSGPA(sgpaResponse.data);
      console.log(marks);
      console.log(sgpaResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Hello {auth.user.name}</h3>

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

      {marks.length > 0 ? (
        <div>
          <h3>Marks for Semester {semester}</h3>
          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, index) => (
                <tr key={index}>
                  <td>{mark.subject}</td>
                  <td>{mark.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sgpa !== null && <h4>SGPA: {sgpa.sgpa}</h4>}
        </div>
      ) : (
        <h2>No marks found</h2>
      )}
    </div>
  );
};

export default StudentHome;
