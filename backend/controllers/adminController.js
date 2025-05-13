import Student from "../models/Student.js";
import bcrypt from 'bcrypt';

export const addStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { name, regno, section, semester, year, password } = req.body;
    const existing = await Student.findOne({ regno });
    if (existing) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      name,
      regno,
      section,
      semester,
      year,
      "password":hashedPassword, // consider hashing this in real apps
    });

    await newStudent.save();

    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




export const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, regno, section, semester, year, password } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, regno, section, semester, year, password },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated', student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



