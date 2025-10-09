const { DataTypes } = require("sequelize");

const registroAsistencia = (database) => {
    database.define("registroAsistencia", {
        idRegistroAsistencia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idEstudiante: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCurso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Estado: {
            type: DataTypes.BOOLEAN
        },
        horaRegistro: {
            type: DataTypes.TIME,
            allowNull: true,
            defaultValue: () => {
                // Extraer la hora actual en formato HH:MM:SS
                const now = new Date();
                return now.toTimeString().split(' ')[0];  // Solo la parte de la hora
            }
        }
    }, { timestamps: false });
};

module.exports = registroAsistencia;
