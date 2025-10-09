const {Student} = require("../db");
   
const createStudent = async(idCiclo,firstName,lastName,dni,gender,age,email,matricula) =>{
    const newStudent = await Student.create({idCiclo,firstName,lastName,dni,gender,age,email,matricula})
    return newStudent;
}
const getStudents = async()=>{
  
    const students= await Student.findAll();
    return students;
}
const updateStudent = async(idEstudiante,idCiclo,firstName,lastName,dni,gender,age,email)=>{
    const findStudent = await Student.findByPk(idEstudiante);

    const studentUpdate = await findStudent.update({idCiclo,firstName,lastName,dni,gender,age,email});
    return studentUpdate;
}
const deleteStudent = async(idEstudiante)=>{
    const student = await Student.findByPk(idEstudiante);
    await student.destroy();
}
    


module.exports = {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent
}