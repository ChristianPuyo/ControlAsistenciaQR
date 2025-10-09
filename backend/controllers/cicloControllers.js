const {Ciclo} = require("../db");
   
const createCiclo = async(Ciclo) =>{
    const newCiclo = await Ciclo.create({Ciclo})
    return newCiclo;
}
const getCiclo = async()=>{
  
    const ciclo= await Ciclo.findAll();
    return ciclo;
}
const updateCiclo = async(idCiclo,Ciclo)=>{
    const findCiclo = await Ciclo.findByPk(idCiclo);

    const cicloUpdate = await findCiclo.update({Ciclo});
    return cicloUpdate;
}
const deleteCiclo = async(idCiclo)=>{
    const ciclo = await Ciclo.findByPk(idCiclo);
    await ciclo.destroy();
}
    


module.exports = {
    createCiclo,
    getCiclo,
    updateCiclo,
    deleteCiclo
}