import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentList.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AddMark = () => {
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});
  const navigate=useNavigate();
  const location = useLocation();
  const student = location.state?.student;
  const semester = location.state?.semester;
  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-subject-bySemNo",
        {
          params: {
            semester: semester,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data);
      setSubjects(response.data);
    }
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    // console.log(e.target);
    console.log(e.target.value);
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(marks);
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-marks",
        {
          student_id: student._id,
          semester: semester,
          subjects: Object.keys(marks),
          marks: Object.values(marks),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data);
      navigate('/students');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        {subjects.map((subject, index) => (
          <div>
            <label htmlFor="{`${subject.subject}`}">{subject.subject}</label>
            <input
              type="number"
              id={`${subject.subject}`}
              name={`${subject.subject}`}
              className="mark-input"
              min="0"
              max="100"
              required
              onChange={handleOnChange}
            />
          </div>
        ))}
        <button onClick={handleOnSubmit}>Submit</button>
      </form>
    </div>
  );
};
export default AddMark;
