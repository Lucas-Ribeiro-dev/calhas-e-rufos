const express = require('express');
require('dotenv').config();
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        port: process.env.GMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.GMAIL_USER,
        subject: `Mensagem de ${req.body.name}`,
        text: `
    Nome: ${req.body.name}
    Email: ${req.body.email}
    WhatsApp: ${req.body.whatsapp}
    
    Mensagem:
    ${req.body.message}
  `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on portn${PORT}`)
})