const {registroAsistencia} = require("../db");
   
const createRegistroAsistencia = async(idEstudiante,idCurso,fecha,Estado) =>{
    const newRegistroAsistencia = await registroAsistencia.create({idEstudiante,idCurso,fecha,Estado})
    return newRegistroAsistencia;
}
const getRegistroAsistencia = async()=>{
  
    const RegistroAsistencia= await registroAsistencia.findAll();
    return RegistroAsistencia;
}
const updateRegistroAsistencia = async(idRegistroAsistencia,idEstudiante,idCurso,fecha,Estado)=>{
    const findRegistroAsistencia = await registroAsistencia.findByPk(idRegistroAsistencia);

    const registroAsistenciaUpdate = await findRegistroAsistencia.update({idEstudiante,idCurso,fecha,Estado});
    return registroAsistenciaUpdate;
}
const deleteRegistroAsistencia = async(idRegistroAsistencia)=>{
    const registroasistencia = await registroAsistencia.findByPk(idRegistroAsistencia);
    await registroasistencia.destroy();
}
    


module.exports = {
    createRegistroAsistencia,
    getRegistroAsistencia,
    updateRegistroAsistencia,
    deleteRegistroAsistencia
}