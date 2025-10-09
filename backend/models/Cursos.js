
const {DataTypes} = require("sequelize");


const Cursos = (database)=>{
    database.define("Cursos",{
        idCurso:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        idDocente:{
            type: DataTypes.INTEGER,
            allowNull:false
            
        },
        nombreCurso:{
            type: DataTypes.STRING,
            allowNull:false
        },
        idCiclo:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull:false
        }
        
    },{timestamps : false })
        }

module.exports = Cursos;

