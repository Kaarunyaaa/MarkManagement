import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ marginBottom: "30px" }}>Student Management</h1>

      <nav
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Link to="/add-student" style={{ textDecoration: "none", fontWeight: "bold" }}>
          Add Student
        </Link>
        <Link to="/students" style={{ textDecoration: "none", fontWeight: "bold" }}>
          View Students
        </Link>
        <Link to="/subjects" style={{ textDecoration: "none", fontWeight: "bold" }}>
          Add Subjects
        </Link>
      </nav>
    </div>
  );
};

export default AdminHome;
