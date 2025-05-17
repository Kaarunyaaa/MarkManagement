import Semester from "../models/SemesterSchema.js";
import Student from "../models/Student.js";
import Mark from "../models/mark.js";
import bcrypt from "bcrypt";

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
      password: hashedPassword, // consider hashing this in real apps
    });

    await newStudent.save();

    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllStudents=async(req,res)=>{
  try{
    const {semester}=req.params;
    const students= await Student.find({semester});
    if (!students) {
      return res.status(404).json({ message: "Students not found" });
    }
    res.status(200).json({ message: "Student updated", student: students });
  }
  catch(error){
    res.status(500).json({message:"Server Error"});
  }
}

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, regno, section, semester, year } = req.body;

    console.log("id:",id);
    console.log(req.body);

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, regno, section, semester, year },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student updated", student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addMark = async (req, res) => {
  try {
    const { student_id, semester, subjects, marks } = req.body;
    console.log(req.body);
    if (subjects.length != marks.length) {
      return res
        .status(400)
        .json({ message: "Subject and mark length doesn't match" });
    }
    console.log("1");
    let markList = [];
    for (let i = 0; i < subjects.length; i++) {
      const newMark = new Mark({
        student_id,
        semester,
        subject: subjects[i],
        marks: marks[i],
      });
      await newMark.save();
      markList.push(newMark);
    }
    console.log("2");

    res
      .status(201)
      .json({ message: "Mark added successfully", mark: markList });
  } catch (error) {
    console.error("Error adding mark:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSemMarksById = async (req, res) => {
  try {
    const { student_id, semester } = req.query;
    console.log(req.query);

    const marks = await Mark.find({
      student_id: student_id,
      semester: semester,
    });

    if (!marks) {
      return res.status(404).json({ message: "Mark not found" });
    }
    res.status(200).json(marks);
  } catch (error) {
    console.error("Error fetching mark:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMark = async (req, res) => {
  try {
    const { student_id, semester, subjects, marks } = req.body;  
    if (subjects.length != marks.length) {
      return res
        .status(400)
        .json({ message: "Subject and mark length doesn't match" });
    }
    let updatedList=[]
    for (let i = 0; i < subjects.length; i++) {
      const updatedMark = await Mark.findOneAndUpdate(
        {student_id,semester,subject: subjects[i]},
        { semester, subject: subjects[i], marks: marks[i] },   
        { new: true, runValidators: true }
      );
      if (!updatedMark) {
        return res.status(404).json({ message: "Mark not found" });
      }
      updatedList.push(updatedMark);
    }

    res.status(200).json({ message: "Mark updated", mark: updatedList });
  } catch (error) {
    console.error("Error updating mark:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMark = async (req, res) => {
  try {
    const { student_id,semester } = req.query;

    const deletedMark = await Mark.deleteMany({ student_id,semester });


    if (!deletedMark) {
      return res.status(404).json({ message: "Mark not found" });
    }

    res.status(200).json({ message: "Mark deleted successfully" });
  } catch (error) {
    console.error("Error deleting mark:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const putSubjectsBySemesterNo=async(req,res)=>{
  try{
    const { semester,subjects,credits }=await req.body;
    if (subjects.length != credits.length) {
      return res.status(400).json({ message: "Subject and mark length doesn't match" });
    }
    let SubList=[]
    for (let i = 0; i < subjects.length; i++) {
      const newSub = new Semester({
        semester,
        subject: subjects[i],
        credit: credits[i],
      });
      await newSub.save();
      SubList.push(newSub);
    }
    res.status(201).json({ message: "Subject added successfully", subject: SubList });
  }
  catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getSubjectsBySemesterNo=async(req,res)=>{
  try{
    const { semester } = await req.query;
    const subjects=await Semester.find({ semester })
    console.log(subjects)
    if (!subjects){
      return res.status(404).json({ message: "Subjects not found" });
    }
    res.status(200).json(subjects);
  } 
  catch (error) {
    console.error("Error fetching mark:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export const getClassPerformance=async(req,res)=>{
    try{
        let sgpaSum=0;
        let total=0;
        let aboveAvg=0;
        let belowAvg=0;
        let sgpaArr=[];
        const{ semester,section }=req.query;
        const students=await Student.find({semester,section});
        console.log(students);
        
        for(let i=0;i<students.length;i++){
            const sgpa=await getSGPA(students[i]._id,semester);
            sgpaSum+=sgpa
            total+=1;
            sgpaArr.push(sgpa);
        }
        const classAverage=(sgpaSum/total);
        for(let i=0;i<sgpaArr.length;i++){
            if(sgpaArr[i]>classAverage){
                aboveAvg+=1
            }
            else{
                belowAvg+=1
            }
        }
        console.log("AboveAverage")
        return res.json({classAverage: classAverage,AboveAverageCount:aboveAvg,BelowAverageCount:belowAvg});
    }
    catch(error){
        res.status(500).json({Message:"Server error"});
    }
}


export const getTopPerformers=async(req,res)=>{
    try{
        const { semester }=req.query;
        let sgpaArr=[];
        const students=await Student.find({semester});
        for(let i=0;i<students.length;i++){
            const sgpa=await getSGPA(students[i]._id,semester);
            sgpaArr.push({student:students[i],sgpa:sgpa});
        }
        sgpaArr.sort((a, b) => b.sgpa - a.sgpa); // Sort by sgpa descending
        res.status(200).json({getTopPerformers:sgpaArr});
        
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }
    
}

export const getSubjectWisePerformance=async(req,res)=>{
    try{
        let markSum=0;
        let total=0;
        let aboveAvg=0;
        let belowAvg=0;
        let markArr=[];
        const{ semester,subject }=req.query;
        const students=await Student.find({semester});
        console.log(students);
        
        for(let i=0;i<students.length;i++){
            const mark=await Mark.find({semester,subject,student_id:students[i]._id});
            console.log(mark);
            markSum+=mark[0].marks;
            total+=1;
            markArr.push(mark[0].marks);
        }
        const classAverage=(markSum/total);
        for(let i=0;i<markArr.length;i++){
            if(markArr[i]>classAverage){
                aboveAvg+=1
            }
            else{
                belowAvg+=1
            }
        }
        return res.json({SubjectAverage: classAverage,AboveAverageCount:aboveAvg,BelowAverageCount:belowAvg});
    }
    catch(error){
        res.status(500).json({Message:"Server error"});
    }
}

