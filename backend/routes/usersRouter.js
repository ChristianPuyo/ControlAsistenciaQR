const {Router}=require("express");
const {createUsers,getUsers,updateUsers,deleteUsers}=require("../controllers/userControllers");
const { emit } = require("nodemon");
const usersRouter=Router();

usersRouter.post("/",async(req,res)=>{
    const {users,contraseña}=req.body;
    try {
        const Users=await createUsers(users,contraseña);
            res.status(200).json(Users);
    } catch (error) {
        res.status(400).json({error:error.message});       
    }
});
usersRouter.get("/",async(req,res)=>{
    try {
        let Users=await getUsers();
        res.status(200).json(Users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
usersRouter.put("/:id",async(req,res)=>{
    const {id}=req.params
    const {users,contraseña}=req.body;
    try {
        const updatedUsers= await updateUsers(id,users,contraseña);
        res.status(200).json(updatedUsers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

usersRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await deleteUsers(id);
        res.status(200).json("eliminado")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});



module.exports = usersRouter;