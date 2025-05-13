import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regno: {
    type: Number,
    required: true,
    unique: true,
  },
  section: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
