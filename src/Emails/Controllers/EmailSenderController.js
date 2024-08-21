import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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
    emailContent = `
      <h3>Contacto directo con comercial</h3>
      <p><strong>Nombre del Restaurante:</strong> ${restaurantName}</p>
      <p><strong>Dirección:</strong> ${address}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `;
  } else if (name && surname) {
    // Caso de "Contacto directo con trabajadora social"
    emailContent = `
      <h3>Contacto directo con trabajadora social</h3>
      <p><strong>Nombre:</strong> ${name} ${surname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `;
  } else {
    return res.status(400).send({ message: 'Datos insuficientes para enviar el correo' });
  }

  // Obtener el directorio actual
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Rutas de los logotipos
  const logos = {
    gobCan: path.join(__dirname, '../../assets/logos/gobCan.png'),
    unionEuropea: path.join(__dirname, '../../assets/logos/union-europea.png'),
    fondosEuro: path.join(__dirname, '../../assets/logos/fondos-euro.png'),
    restaurantesSolidarios: path.join(__dirname, '../../assets/logos/1-rmv.png'),
    aisaForm: path.join(__dirname, '../../assets/logos/aisa-form.png')
  };

  // Mensaje en formato HTML
  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:gobCanLogo" alt="Gobierno de Canarias" style="height: 50px; margin-right: 15px;">
        <img src="cid:unionEuropeaLogo" alt="Unión Europea" style="height: 50px; margin-right: 15px;">
        <img src="cid:fondosEuroLogo" alt="Fondos Europeos" style="height: 50px; margin-right: 15px;">
        <img src="cid:restaurantesSolidariosLogo" alt="Restaurantes Solidarios" style="height: 50px; margin-right: 15px;">
        <img src="cid:aisaFormLogo" alt="AISA Form" style="height: 50px;">
      </div>
      ${emailContent}
    </div>
  `;

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
    html: htmlMessage,
    attachments: [
      {
        filename: 'gobCan.png',
        path: logos.gobCan,
        cid: 'gobCanLogo'
      },
      {
        filename: 'union-europea.png',
        path: logos.unionEuropea,
        cid: 'unionEuropeaLogo'
      },
      {
        filename: 'fondos-euro.png',
        path: logos.fondosEuro,
        cid: 'fondosEuroLogo'
      },
      {
        filename: '1-rmv.png',
        path: logos.restaurantesSolidarios,
        cid: 'restaurantesSolidariosLogo'
      },
      {
        filename: 'aisa-form.png',
        path: logos.aisaForm,
        cid: 'aisaFormLogo'
      }
    ]
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
