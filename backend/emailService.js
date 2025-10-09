const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'suizadsi2024@gmail.com', // Reemplaza con tu correo electrónico
    pass: 'e d c a c f c q l x g a p y k l' // Reemplaza con tu contraseña de inicio de sesion con aplicaciones
  }
});

const sendEmail = (to, subject, text, filePath, filename) => {
  const mailOptions = {
    from: 'suizadsi2024@gmail.com', // Dirección de correo remitente
    to: to, // Dirección de correo destinatario
    subject: subject, // Asunto del correo
    text: text, // Contenido del correo
    attachments: [
      {
        filename: filename,
        path: filePath
      }
    ]
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      // Eliminar archivo temporal después de enviar el correo
      fs.unlinkSync(filePath);
      resolve(info);
    });
  });
};

module.exports = sendEmail;
