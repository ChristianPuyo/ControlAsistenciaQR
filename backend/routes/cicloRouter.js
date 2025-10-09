const {Router}=require("express");
const {createCiclo,getCiclo,updateCiclo,deleteCiclo}=require("../controllers/cicloControllers");
const { emit } = require("nodemon");
const cicloRouter=Router();

cicloRouter.post("/",async(req,res)=>{
    const {Ciclo}=req.body;
    try {
        const newCiclo = await createCiclo(Ciclo);
        res.status(200).json(newCiclo);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
cicloRouter.get("/",async(req,res)=>{
    try {
        let listCiclo=await getCiclo();
        res.status(200).json(listCiclo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
cicloRouter.put("/:id",async(req,res)=>{
    const {idCiclo}=req.params
    const {Ciclo}=req.body;
    try {
        const updatedCiclo= await updateCiclo(idCiclo,Ciclo);
        res.status(200).json(updatedCiclo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

cicloRouter.delete('/:id',async(req,res)=>{
    const {idCiclo}=req.params
    try {
        await deleteCiclo(idCiclo);
        res.status(200).json("eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = cicloRouter

