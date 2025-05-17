// components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("student"); // or "admin"
  const [regno, setRegno] = useState("");
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      if (role === "student") {
        response = await axios.post("http://localhost:5000/api/auth/login",{regno,password,});
      } else {
        console.log(user_id,password);
        response = await axios.post("http://localhost:5000/api/auth/adminlogin",{user_id,password,});
        console.log(response);
      }


      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
      console.log(user,token);

      alert("Login successful!");
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      <div>
        <label>
          <input
            type="radio"
            value="student"
            checked={role === "student"}
            onChange={() => setRole("student")}
          />
          Student
        </label>
        <label style={{ marginLeft: 20 }}>
          <input
            type="radio"
            value="admin"
            checked={role === "admin"}
            onChange={() => setRole("admin")}
          />
          Admin
        </label>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        {role === "student" ? (
          <input
            type="text"
            placeholder="Register No"
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
            required
          />
        ) : (
          <input
            type="text"
            placeholder="Admin ID"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        )}
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default Login;
