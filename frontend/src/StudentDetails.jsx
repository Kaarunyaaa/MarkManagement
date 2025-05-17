import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDetails.css";

const StudentDetails = () => {
  const [semester, setSemester] = useState("");
  const [marks, setMarks] = useState([]);
  const [sgpa, setSgpa] = useState(null); // New state for SGPA
  const navigate= useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  const fetchSemesterMarks = async (selectedSemester) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-marks",
        {
          params: {
            student_id: student._id,
            semester: selectedSemester,
          },
        }
      );
      setMarks(response.data);
      console.log(response.data);
      if (response.data.length > 0) {
        const sgpaResponse = await axios.get(
          "http://localhost:5000/api/student/get-sgpa",
          {
            params: {
              student_id: student._id,
              semester: selectedSemester,
            },
          }
        );
        setSgpa(sgpaResponse.data);
      }
    } catch (error) {
      console.error("Error fetching semester marks or SGPA:", error);
    }
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    fetchSemesterMarks(selectedSemester);
  };

  const handleAddMarkClick =(e)=>{
    navigate('/addMark', { state: { student,semester } });
  }

  const handleDeleteClick=async(e)=>{
    const response = await axios.delete(
      'http://localhost:5000/api/admin/delete-marks',{
        params:{
          student_id:student._id,
          semester:semester
        }
      }
    );
    alert("Student Successfully deleted");
    setMarks([]);
    setSgpa(null);
  }

  if (!student) {
    return <div>No student data available.</div>;
  }

  const handleEditClick=(e)=>{
    navigate('/editMark',{state:{ student,semester,marks }});
  }
  return (
    <div className="container">
      <h2>Welcome {student.name}</h2>

      <label htmlFor="semester">Select Semester:</label>
      <select
        id="semester"
        value={semester}
        onChange={handleSemesterChange}
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
        <div className="marks-section" style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
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
          <button onClick={handleEditClick}>Edit Marks</button>
          <button onClick={handleDeleteClick}>Delete Marks</button>
        </div>
      ) : (
        semester && (
          <div style={{ display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <p className="no-marks">No marks found for Semester {semester}.</p>
            <button style={{ width:'40%' }} onClick={ handleAddMarkClick }>Add Marks</button>
          </div>
        )
      )}
    </div>
  );
};

export default StudentDetails;
