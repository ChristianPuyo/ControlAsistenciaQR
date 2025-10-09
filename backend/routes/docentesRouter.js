const {Router}=require("express");
const {createDocentes,getDocentes,updateDocentes,deleteDocentes}=require("../controllers/docentesControllers");
const { emit } = require("nodemon");
const docentesRouter=Router();

docentesRouter.post("/",async(req,res)=>{
    const {firstName,lastName,dni,correo}=req.body;
    try {
        const newDocentes=await createDocentes(firstName,lastName,dni,correo);
            res.status(200).json(newDocentes);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
docentesRouter.get("/",async(req,res)=>{
    try {
        let docentes=await getDocentes();
        res.status(200).json(docentes)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
docentesRouter.put("/:id",async(req,res)=>{
    const {id}=req.params
    const {firstName,lastName,dni,correo}=req.body;
    try {
        const updatedDocentes= await updateDocentes(id,firstName,lastName,dni,correo);
        res.status(200).json(updatedDocentes)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

docentesRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteDocentes(id);
        res.status(200).json("Docente eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = docentesRouter

