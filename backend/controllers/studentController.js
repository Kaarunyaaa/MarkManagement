import Semester from "../models/SemesterSchema.js";
import Student from "../models/Student.js";
import Mark from "../models/mark.js";

function getGradePoint(mark){
    if(mark>=90){
        return 10;
    }
    else if(mark>=85){
        return 9;
    }
    else if(mark>=75){
        return 8;
    }
    else if(mark>=65){
        return 7;
    }
    else if(mark>=55){
        return 6;
    }
    else if(mark>=50){
        return 5;
    }
    else{
        return 2;
    }
}

async function getSGPA(student_id,semester){
    const subjects=await Semester.find({ semester });
    console.log(subjects);
    var sgpa=0;
    var totalCredits=0;
    for(let i=0;i<subjects.length;i++){
        const mark=await Mark.find({student_id,semester,"subject":subjects[i].subject});
        console.log(mark);
        console.log(mark[0].marks);
        const grade=getGradePoint(mark[0].marks);
        console.log(grade);
        sgpa+=(grade*subjects[i].credit);
        totalCredits+=subjects[i].credit;
    }
    return sgpa/totalCredits;

}

export const getSgpaById=async(req,res)=>{
  try{
    const { student_id,semester }=req.query;
    const sgpa=await getSGPA(student_id,semester);
    res.status(200).json({ sgpa: sgpa });
  }
  catch (error) {
    console.error("Error computing sgpa:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export const getSemMarks = async (req, res) => {
  try {
    const { semester } = req.query;

    const student_id=req.student_id;
    console.log(student_id);
    console.log(semester);
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