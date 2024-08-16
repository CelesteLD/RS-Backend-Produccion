// src/Emails/Controllers/EmailSenderCredentialsController.js
import nodemailer from 'nodemailer';

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

    // Mensaje predefinido
    const message = `
Estimado(a) ${restaurantName},

Queremos expresar nuestro más sincero agradecimiento por unirse al proyecto "Restaurantes Solidarios". Su participación es fundamental para ayudar a combatir el desperdicio de alimentos y apoyar a aquellos que más lo necesitan. Gracias a su compromiso, estamos un paso más cerca de construir una comunidad más solidaria y sostenible.

A continuación, le proporcionamos las credenciales necesarias para acceder a la aplicación "Restaurantes Solidarios App", donde podrá gestionar sus contribuciones y mantenerse al tanto de las últimas novedades:

- **Usuario:** ${loginUsername}
- **Contraseña:** ${loginPassword}

Gracias nuevamente por su valiosa colaboración. Estamos emocionados de contar con usted en este proyecto.

Saludos cordiales,

El equipo de Restaurantes Solidarios
    `;

    // Configurar las opciones del correo con el subject y mensaje predefinidos
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Credenciales para el inicio de sesión en Restaurantes Solidarios App',
        text: message,
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
