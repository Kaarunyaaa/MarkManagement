// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  console.log(!authHeader);
  console.log(!authHeader.startsWith("Bearer "));

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use your secret
    console.log(decoded);
    req.student_id = decoded.id; // Attach to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const verifyAdminAccess = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use your secret
    console.log(decoded);
    if(!decoded.isAdmin){
        return res.status(403).json({message:"Not an Admin"});
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
