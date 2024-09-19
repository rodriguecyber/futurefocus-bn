import cron from "node-cron";
import Student from "../models/Students";
import { Attendance } from "../models/Attendance";


export const dailyAttendance = () => {
  cron.schedule("0 9 * * *", async () => {
    const students = await Student.find({ status: "started" });
  const attendance=  students.forEach(async (student) => {
      await Attendance.create({
        studentId: student._id,
      });
    });
    console.log(attendance);
  });
};
export const dropout = ()=>{
  cron.schedule("0 8 * * *", async()=>{
       const students = await Student.find({status:"started"});
     students.forEach(async(student)=>{
    const absence = await Attendance.find({$and:[{
      studentId:student._id,
      status:"absent"
    }]})
    if(absence.length>14){
    student.status = 'dropedout'
    await student.save()
    }
     })
     })
}

