// src/Emails/Controllers/EmailSenderByAppController.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const EmailSenderByAppController = async (req, res) => {
    const { message, restaurantName } = req.body;

    if (!message || !restaurantName) {
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
        from: process.env.EMAIL_USER,
        to: 'asistencia@aisaformacion.com',
        subject: 'Reporte de Incidencia - Restaurantes Solidarios',
        text: `Restaurante: ${restaurantName}\n\nMensaje: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).send({ message: 'Error al enviar el mensaje' });
    }
};
