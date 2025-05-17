import React, { useState } from "react";
import axios from "axios";
import "./AddStudentForm.css";
import { useAuth } from "./AuthContext";

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    section: "",
    semester: "",
    year: "",
    password: "",
  });
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-student",
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data);
      alert("Student added successfully");
      // Clear the form fields
      setFormData({
        name: "",
        regno: "",
        section: "",
        semester: "",
        year: "",
        password: "", // This line was missing
      });
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
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
