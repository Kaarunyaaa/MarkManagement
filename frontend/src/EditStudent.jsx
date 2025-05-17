import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddStudentForm.css";
import { useAuth } from "./AuthContext";

const EditStudent = () => {
  const location = useLocation();
  const student = location.state?.student;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const auth = useAuth();

  useEffect(() => {
    console.log(student);
    setFormData({
      name: student.name,
      regno: student.regno,
      semester: student.semester,
      section: student.section,
      year: student.year,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-student/${student._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data);
      alert("Student updated successfully");
      // Clear the form fields
      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="regno"
        placeholder="Registration Number"
        value={formData.regno}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="section"
        placeholder="Section"
        value={formData.section}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="semester"
        placeholder="Semester"
        value={formData.semester}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default EditStudent;
