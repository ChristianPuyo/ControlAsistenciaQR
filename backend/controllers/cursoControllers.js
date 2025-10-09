const {Cursos} = require("../db");
   
const createCursos = async(idDocente,nombreCurso,idCiclo,descripcion) =>{
    const newCursos = await Cursos.create({idDocente,nombreCurso,idCiclo,descripcion})
    return newCursos;
}
const getCursos = async()=>{
  
    const cursos= await Cursos.findAll();
    return cursos;
}
const updateCursos = async(idCurso,idDocente,nombreCurso,idCiclo,descripcion)=>{
    const findCursos = await Cursos.findByPk(idCurso);

    const cursosUpdate = await findCursos.update({idDocente,nombreCurso,idCiclo,descripcion});
    return cursosUpdate;
}
const deleteCursos = async(idCurso)=>{
    const curso = await Cursos.findByPk(idCurso);
    await curso.destroy();
}
    


module.exports = {
    createCursos,
    getCursos,
    updateCursos,
    deleteCursos
}