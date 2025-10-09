const {Router}=require("express");
const {createCursos,getCursos,updateCursos,deleteCursos}=require("../controllers/cursoControllers");
const { emit } = require("nodemon");
const cursosRouter=Router();

cursosRouter.post("/",async(req,res)=>{
    const {idDocente,nombreCurso,idCiclo,descripcion}=req.body;
    try {
        const newCursos=await createCursos(idDocente,nombreCurso,idCiclo,descripcion);
            res.status(200).json(newCursos);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
cursosRouter.get("/",async(req,res)=>{
    try {
        let Cursos=await getCursos();
        res.status(200).json(Cursos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
cursosRouter.put("/:id",async(req,res)=>{
    const {id}=req.params
    const {idDocente,nombreCurso,idCiclo,descripcion}=req.body;
    try {
        const updatedCursos= await updateCursos(id,idDocente,nombreCurso,idCiclo,descripcion);
        res.status(200).json(updatedCursos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

cursosRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteCursos(id);
        res.status(200).json("eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = cursosRouter

