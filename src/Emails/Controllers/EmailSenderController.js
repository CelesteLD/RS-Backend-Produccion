import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const EmailSenderController = async (req, res) => {
  const { name, surname, email, phone, message, recipient } = req.body; // Incluye el destinatario

  if (!name || !surname || !email || !phone || !message || !recipient) { // Verifica que el destinatario esté presente
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: email,
    to: recipient, // Usa el destinatario correcto
    subject: 'PROYECTO RESTAURANTES SOLIDARIOS',
    text: `Nombre: ${name} ${surname}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
  };

  try {
    console.log('Enviando mensaje a ' + mailOptions.to);
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).send({ message: 'Error al enviar el mensaje' });
  }
};
