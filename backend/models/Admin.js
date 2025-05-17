import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
