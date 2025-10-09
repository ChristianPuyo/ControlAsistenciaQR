const { Sequelize } = require("sequelize");

// Importar modelos
const Docentes = require("./models/Docentes");
const StudentMode1 = require("./models/Student");
const RegistroAsistencia = require("./models/RegistroAsistencia");
const Cursos = require("./models/Cursos");
const Ciclo = require("./models/Ciclo");
const Users =require('./models/User')

const DB_USER = 'postgres';
const DB_PASSWORD = 'admin';
const DB_HOST = 'localhost:5432';

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/controlasistencia`, { logging: false });

// Registrar modelos
Docentes(database);
StudentMode1(database);
RegistroAsistencia(database);
Cursos(database);
Ciclo(database);
Users(database);

const { models } = database;
console.log(models);

module.exports = { database, ...models };
