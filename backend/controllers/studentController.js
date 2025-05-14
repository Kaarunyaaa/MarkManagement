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
    const { student_id,semester }=await req.body;
    const sgpa=await getSGPA(student_id,semester);
    res.status(200).json({ sgpa: sgpa });
  }
  catch (error) {
    console.error("Error computing sgpa:", error);
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
        const{ semester,section }=req.body;
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
        const { semester }=req.body;
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
        const{ semester,subject }=req.body;
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