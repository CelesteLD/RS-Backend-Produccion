import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const EmailSenderController = async (req, res) => {
  const { restaurantName, address, name, surname, email, phone, message, recipient } = req.body;

  // Verifica que los campos básicos y el destinatario estén presentes
  if (!email || !phone || !message || !recipient) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  // Define el contenido del email dependiendo del formulario seleccionado
  let emailContent = '';
  if (restaurantName && address) {
    // Caso de "Contacto directo con comercial"
    emailContent = `Nombre del Restaurante: ${restaurantName}\nDirección: ${address}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`;
  } else if (name && surname) {
    // Caso de "Contacto directo con trabajadora social"
    emailContent = `Nombre: ${name} ${surname}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`;
  } else {
    return res.status(400).send({ message: 'Datos insuficientes para enviar el correo' });
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
    to: recipient,
    subject: 'PROYECTO RESTAURANTES SOLIDARIOS',
    text: emailContent,
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
