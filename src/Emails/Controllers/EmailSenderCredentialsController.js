import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

export const EmailSenderCredentialsController = async (req, res) => {
    const { to, restaurantName, loginUsername, loginPassword } = req.body;

    // Verificar que todos los campos estén presentes
    if (!to || !restaurantName || !loginUsername || !loginPassword) {
        return res.status(400).send({ message: 'Todos los campos son obligatorios' });
    }

    // Crear un transportador SMTP usando las credenciales proporcionadas
    let transporter = nodemailer.createTransport({
        service: 'gmail',  // Puedes usar otro servicio si es necesario
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

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
    const message = `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:gobCanLogo" alt="Gobierno de Canarias" style="height: 50px; margin-right: 15px;">
            <img src="cid:unionEuropeaLogo" alt="Unión Europea" style="height: 50px; margin-right: 15px;">
            <img src="cid:fondosEuroLogo" alt="Fondos Europeos" style="height: 50px; margin-right: 15px;">
            <img src="cid:restaurantesSolidariosLogo" alt="Restaurantes Solidarios" style="height: 50px; margin-right: 15px;">
            <img src="cid:aisaFormLogo" alt="AISA Form" style="height: 50px;">
        </div>
        <h2 style="color: #2a7ae2;">Estimado(a) ${restaurantName},</h2>
        <p>Queremos expresar nuestro más sincero agradecimiento por unirse al proyecto <strong>"Restaurantes Solidarios"</strong>. Su participación es fundamental para ayudar a combatir el desperdicio de alimentos y apoyar a aquellos que más lo necesitan. Gracias a su compromiso, estamos un paso más cerca de construir una comunidad más solidaria y sostenible.</p>
        <div style="border: 1px solid #ddd; padding: 15px; background-color: #f9f9f9; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); margin-bottom: 20px; max-width: 400px; margin: 0 auto;">
            <p><strong>Usuario:</strong> ${loginUsername}<br>
            <strong>Contraseña:</strong> ${loginPassword}</p>
        </div>
        <p>Gracias nuevamente por su valiosa colaboración. Estamos emocionados de contar con usted en este proyecto.</p>
        <p>Saludos cordiales,<br>
        El equipo de Restaurantes Solidarios</p>
    </div>
    `;

    // Configurar las opciones del correo con el subject y mensaje HTML
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Credenciales para el inicio de sesión en Restaurantes Solidarios App',
        html: message,
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
        // Intentar enviar el correo
        await transporter.sendMail(mailOptions);
        console.log("Mensaje enviado");
        res.status(200).send({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send({ message: 'Error al enviar el correo' });
    }
};
