const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const sendEmail = require('./emailService');

// Importar los routers
const studentRouter = require("./routes/studentRouter");
const cicloRouter = require("./routes/cicloRouter");
const cursosRouter = require("./routes/cursoRouter");
const registroAsistenciaRouter = require("./routes/registroAsistenciaRouter");
const docentesRouter = require("./routes/docentesRouter");
const usersRouter = require('./routes/usersRouter');

// Configuración del servidor
const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(bodyParser.json());

// Configuración de multer para la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Configuración de las rutas
server.use("/Student", studentRouter);
server.use("/Ciclo", cicloRouter);
server.use("/Cursos", cursosRouter);
server.use("/registroAsistencia", registroAsistenciaRouter);
server.use("/Docentes", docentesRouter);
server.use("/Users", usersRouter);

// Endpoint para enviar correos electrónicos con archivo adjunto
server.post('/send-email', upload.single('file'), async (req, res) => {
  const { to, subject, text } = req.body;

  // Verificar si el archivo fue subido
  if (!req.file) {
    return res.status(400).json({ message: 'File is required' });
  }

  const { path: filePath, originalname } = req.file;

  try {
    const info = await sendEmail(to, subject, text, filePath, originalname);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});



// Importar y sincronizar la base de datos
const { database } = require("./db");
database.sync({ alter: true }) // Forzar la sincronización para recrear las tablas
  .then(() => {
    server.listen(3001, () => {
      console.log("Servidor escuchando en el puerto 3001");
    });
  })
  .catch((err) => console.log("Error al sincronizar la base de datos:", err.message));
