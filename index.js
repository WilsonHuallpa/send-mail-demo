const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/send-mail', async (req, res) => {
    try {
        const { aceptacion, nombreUsuario, mail } = req.body;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "lostresparrilleros03@gmail.com",
                pass: "vuowlknbjxxqiztm"
            }
        });
        let resultado = await transporter.sendMail({
            from: '"Los Tres Parrilleros " <lostresparrilleros03@gmail.com>',
            to: mail,
            subject: aceptacion ? 'Felicitaciones su cuenta fue aceptada' : 'Disculpa pero hemos bloqueado su cuenta',
            html: `
            <h1>${aceptacion ? 'Felicitaciones' : 'Disculpe'} ${nombreUsuario}</h1>
            <p>Su cuenta fue ${aceptacion ? 'aceptada' : 'rechazada'}</p>
            <p>Saludos Los Tres Parrilleros</p>
            `,
        });
        res.json({ ...resultado, seEnvio: true});
    } catch (error) {
        res.json({
            mensaje: 'No se pudo enviar el mail' + error,
            seEnvio: false,
        });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('App lista'));