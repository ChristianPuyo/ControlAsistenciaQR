const {Router}=require("express");
const {createRegistroAsistencia,getRegistroAsistencia,updateRegistroAsistencia,deleteRegistroAsistencia}=require("../controllers/registroAsistenciaControllers");
const { emit } = require("nodemon");
const registroAsistenciaRouter=Router();

registroAsistenciaRouter.post("/",async(req,res)=>{
    const {idEstudiante,idCurso,fecha,Estado}=req.body;
    console.log("Esto está llegando para registrar asistencia:",req.body);
    
    try {
        const newRegistroAsistencia=await createRegistroAsistencia(idEstudiante,idCurso,fecha,Estado);
            res.status(200).json(newRegistroAsistencia);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
registroAsistenciaRouter.get("/",async(req,res)=>{
    try {
        let registroAsistencia=await getRegistroAsistencia();
        res.status(200).json(registroAsistencia)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

registroAsistenciaRouter.put("/:id",async(req,res)=>{
    const {idRegistroAsistencia}=req.params
    const {idEstudiante,idCurso,fecha,Estado}=req.body;
    try {
        const updatedRegistroAsistencia= await updateRegistroAsistencia(idRegistroAsistencia,idEstudiante,idCurso,fecha,Estado);
        res.status(200).json(updatedRegistroAsistencia)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

registroAsistenciaRouter.delete('/:id',async(req,res)=>{
    const {idRegistroAsistencia}=req.params
    try {
        await deleteRegistroAsistencia(idRegistroAsistencia);
        res.status(200).json("eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = registroAsistenciaRouter

