const {DataTypes} = require("sequelize");

const StudentMode1 =(database)=>{
    database.define("Student",{
        idEstudiante:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        idCiclo:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
            },
        dni:{
            type :DataTypes.STRING,
            allowNull:false
        },
        gender:{
            type :DataTypes.STRING,
            allowNull:false
        },
        age:{
            type:DataTypes.INTEGER,
            alowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps : false })
        }
 

module.exports = StudentMode1;

