import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentList.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const EditMark = () => {
  const [marks, setMarks] = useState({});
  const location = useLocation();
  const student = location.state?.student;
  const semester = location.state?.semester;
  const oldMarks = location.state?.marks;
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    console.log("oldmark", oldMarks);
    let t = {};
    for (let i = 0; i < oldMarks.length; i++) {
      t = { ...t, [oldMarks[i].subject]: oldMarks[i].marks };
    }
    setMarks(t);
    console.log("t:", t);
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
      const response = await axios.put(
        "http://localhost:5000/api/admin/update-marks",
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
      navigate("/student-detail", { state: { student } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        {oldMarks.map((oldMark, index) => (
          <div>
            <label htmlFor="{`${oldMark.subject}`}">{oldMark.subject}</label>
            <input
              type="number"
              id={`${oldMark.subject}`}
              name={`${oldMark.subject}`}
              value={`${marks[oldMark.subject]}`}
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
export default EditMark;
