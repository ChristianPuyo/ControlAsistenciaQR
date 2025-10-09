const {Router}=require("express");
const {createStudent,getStudents,updateStudent,deleteStudent}=require("../controllers/studentControllers");
const { emit } = require("nodemon");
const studentRouter=Router();

studentRouter.post("/",async(req,res)=>{
    const {idCiclo,firstName,lastName,dni,gender,age,email,matricula}=req.body;
    try {
        const newStudent=await createStudent(idCiclo,firstName,lastName,dni,gender,age,email,matricula);
            res.status(200).json(newStudent);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
studentRouter.get("/",async(req,res)=>{
    try {
        let student=await getStudents();
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
studentRouter.put("/:id",async(req,res)=>{
    
    const {id}=req.params
    const {idCiclo,firstName,lastName,dni,gender,age,email}=req.body;
    console.log(req.body);
    
    try {
        const updatedStudent= await updateStudent(id,idCiclo,firstName,lastName,dni,gender,age,email);
        res.status(200).json(updatedStudent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

studentRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteStudent(id);
        res.status(200).json("Estudiante eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = studentRouter

