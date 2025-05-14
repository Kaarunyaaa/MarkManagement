// models/Mark.js
import mongoose from 'mongoose';

const markSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

markSchema.index({ student_id: 1, semester: 1, subject: 1 }, { unique: true });

const Mark = mongoose.model('Mark', markSchema);
export default Mark;
