const {DataTypes} = require("sequelize");


const Docentes =(database)=>{
    database.define("Docentes",{
        idDocentes:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull:false
            
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull:false
        },
        dni:{
            type: DataTypes.STRING,
            allowNull:false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull:false
        }
        
    },{timestamps : false })
        }

module.exports = Docentes;

