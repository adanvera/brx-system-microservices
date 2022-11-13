
const nodemailer = require("nodemailer");

const sendRegisterMail = async (email, password) => {

    const registerForm =
        `
        <div class=""
            style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
            <div class="headimg">
                <img width="25%" src="http://drive.google.com/uc?export=view&id=1q1gXiwbiu6xHil_kpT9WSDcR6dWke6yX" alt=""
                    data-bit="iit" />
            </div>
            <div class="texthead">
                <h1>Bienvenido a BRX SGO</h1>
            </div>
            <div class="cont" style=" border-radius: 8px;">
                <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
                padding-left: 20px;">
                    <h4>Sus credenciales para iniciar sesión son:</h4>
                    <p>usuario: ${email}</p>
                    <p>password: ${password}</p>
                </div>
            </div>
        </div>
    `

    console.log("Se hace envio de correo de registro");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.brxsgo.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'notificaciones@brxsgo.com', // your cPanel email address
            pass: 'Kj9JWqn}2(-x', // your cPanel email password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"REGISTRO BRXSGO" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Registro brxsgo", // Subject line
        text: "Te damos la bienvenida", // plain text body
        html: registerForm, // html body
    });
    console.log("Envio exitoso de correo de registro");
}

const resetPasswordMail = async (email, newPassword) => {
    const resetPassordForm =
        `
    <div class=""
        style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
        <div class="headimg">
            <img width="25%" src="http://drive.google.com/uc?export=view&id=1q1gXiwbiu6xHil_kpT9WSDcR6dWke6yX" alt=""
                data-bit="iit" />
        </div>
        <div class="texthead">
            <h1>Reseteo de contraseña</h1>
        </div>
        <div class="cont" style=" border-radius: 8px;">
            <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
            padding-left: 20px;">
                <h4>Sus credenciales para iniciar sesión son:</h4>
                <p>usuario: ${email}</p>
                <p>password: ${newPassword}</p>
            </div>
        </div>
    </div>
    `

    console.log("Se hace envio de correo de reseteo");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.brxsgo.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'notificaciones@brxsgo.com', // your cPanel email address
            pass: 'Kj9JWqn}2(-x', // your cPanel email password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"RESETEO DE CONTRASEÑA" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Reseteo de contraseña", // Subject line
        text: "Te damos la bienvenida", // plain text body
        html: registerForm, // html body
    });
    console.log("Envio exitoso de reseto de contraseña");
}


module.exports = {
    sendRegisterMail,
    resetPasswordMail
}