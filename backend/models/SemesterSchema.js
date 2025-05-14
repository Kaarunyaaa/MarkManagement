import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
});

const Semester = mongoose.model("Semester", semesterSchema);
export default Semester;
