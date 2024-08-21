// src/Emails/Controllers/EmailSenderIncidentUserController.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

export const EmailSenderIncidentUserController = async (req, res) => {
    const { message, id_recogida } = req.body;

    if (!message || !id_recogida) {
        return res.status(400).send({ message: 'Todos los campos son obligatorios' });
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

    // Construcción del contenido HTML del correo
    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:gobCanLogo" alt="Gobierno de Canarias" style="height: 50px; margin-right: 10px;">
                <img src="cid:unionEuropeaLogo" alt="Unión Europea" style="height: 50px; margin-right: 10px;">
                <img src="cid:fondosEuroLogo" alt="Fondos Europeos" style="height: 50px; margin-right: 10px;">
                <img src="cid:restaurantesSolidariosLogo" alt="Restaurantes Solidarios" style="height: 50px; margin-right: 10px;">
                <img src="cid:aisaFormLogo" alt="AISA Form" style="height: 50px;">
            </div>
            <h2 style="text-align: center; color: #00529B; margin-bottom: 30px;">Reporte de Incidencia</h2>
            <div style="border-top: 1px solid #ddd; padding-top: 20px;">
                <p><strong>ID de Recogida:</strong> ${id_recogida}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message}</p>
            </div>
        </div>
    `;

    // Configuración del transporter de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Configuración de las opciones del correo
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'asistencia@aisaformacion.com',
        subject: 'Reporte de Incidencia - Restaurantes Solidarios',
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
        console.log(`Enviando reporte de incidencia para la recogida ID: ${id_recogida}`);
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).send({ message: 'Error al enviar el mensaje' });
    }
};
