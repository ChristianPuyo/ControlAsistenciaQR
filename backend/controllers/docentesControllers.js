const {Docentes} = require("../db");
   
const createDocentes = async(firstName,lastName,dni,correo) =>{
    const newDocentes = await Docentes.create({firstName,lastName,dni,correo})
    return newDocentes;
}
const getDocentes = async()=>{
  
    const docentes= await Docentes.findAll();
    return docentes;
}
const updateDocentes = async(idDocentes,firstName,lastName,dni,correo)=>{
    const findDocentes = await Docentes.findByPk(idDocentes);

    const DocentesUpdate = await findDocentes.update({firstName,lastName,dni,correo});
    return DocentesUpdate;
}
const deleteDocentes = async(idDocentes)=>{
    const docentes = await Docentes.findByPk(idDocentes);
    await docentes.destroy();
}
    


module.exports = {
    createDocentes,
    getDocentes,
    updateDocentes,
    deleteDocentes
}