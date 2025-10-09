const {Users} = require("../db");
   
const createUsers = async(users,contraseña) =>{
    const newUsers = await Users.create({users,contraseña})
    return newUsers;
}
const getUsers = async()=>{
  
    const users= await Users.findAll();
    return users;
}
const updateUsers = async(idUsers,users,contraseña)=>{
    const findUsers = await Users.findByPk(idUsers);

    const newUsers = await findUsers.update({users,contraseña});
    return newUsers;
}
const deleteUsers= async(idUsers)=>{
    const users = await Users.findByPk(idUsers);
    await users.destroy();
}
    


module.exports = {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers
}