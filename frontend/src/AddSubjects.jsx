import React, { useState } from 'react';
import axios from 'axios';
import './AddSubjects.css';

const AddSubjects = () => {
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', credit: '' }]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSubjectChange = (index, e) => {
    const newSubjects = [...subjects];
    newSubjects[index][e.target.name] = e.target.value;
    setSubjects(newSubjects);
  };

  const addSubjectField = () => {
    setSubjects([...subjects, { subject: '', credit: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/add-subject', {
        semester,
        subjects: subjects.map(s => s.subject),
        credits: subjects.map(s => s.credit),
      });
      console.log(response.data);
      alert('Subjects added successfully');
      // Reset the form fields
      setSemester('');
      setSubjects([{ subject: '', credit: '' }]);
    } catch (error) {
      console.error('Error adding subjects:', error);
      alert('Server error');
    }
  };

  return (
    <div className="add-subjects-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="semester">Select Semester:</label>
        <select id="semester" value={semester} onChange={handleSemesterChange} required>
          <option value="">Select</option>
          {[...Array(8).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
        {subjects.map((subject, index) => (
          <div key={index}>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={subject.subject}
              onChange={(e) => handleSubjectChange(index, e)}
              required
            />
            <input
              type="number"
              name="credit"
              placeholder="Credit"
              value={subject.credit}
              onChange={(e) => handleSubjectChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSubjectField}>Add More</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddSubjects;
