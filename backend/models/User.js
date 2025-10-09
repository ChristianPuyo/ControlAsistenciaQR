const {DataTypes} = require("sequelize");

const Users =(database)=>{
    database.define("Users",{
        idUsers:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        users:{
            type:DataTypes.STRING,
            allowNull:false
        },
        contraseña:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps : false })
        }
 

module.exports = Users;