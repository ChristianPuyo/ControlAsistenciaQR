const {DataTypes} = require("sequelize");


const Ciclo =(database)=>{
    database.define("Ciclo",{
        idCiclo:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        Ciclo:{
            type: DataTypes.STRING,
            allowNull:false
        }
        
        
    },{timestamps : false })
        }


module.exports = Ciclo;
