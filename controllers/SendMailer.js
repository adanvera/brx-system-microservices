
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

const resetPasswordMail = async (newPassword, email) => {
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
                    <h4>Su nueva contraseña es:</h4>
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
        html: resetPassordForm, // html body
    });
    console.log("Envio exitoso de reseto de contraseña");
}

const sendNotification = async (email) => {
    const notificationForm =
        `
    <div class=""
        style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
        <div class="headimg">
            <img width="25%" src="http://drive.google.com/uc?export=view&id=1q1gXiwbiu6xHil_kpT9WSDcR6dWke6yX" alt=""
                data-bit="iit" />
        </div>
        <div class="texthead">
            <h1>Esto es una notificación</h1>
        </div>

        /***/

crear cuerpo de notificación

        /****/

    </div>
`

    console.log("Se hace envio de notificación");
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
        from: '"Notificación" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Notificación", // Subject line
        text: "Te damos la bienvenida", // plain text body
        html: notificationForm, // html body
    });
    console.log("Envio exitoso de notificación");
}

const sendNotificationTkt = async (email, ticket) => {

    const notificationForm =
        `
<div class=""
    style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
    <div class="headimg">
        <img width="25%" src="http://drive.google.com/uc?export=view&id=1q1gXiwbiu6xHil_kpT9WSDcR6dWke6yX" alt=""
            data-bit="iit" />
    </div>
    <div class="texthead">
        <h1>Nuevo ticket asignado</h1>
    </div>
    <div class="cont" style=" border-radius: 8px;">
        <h6>Se te ha asignado un nuevo ticket</h6>
        <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
        padding-left: 20px;">
            <p>Asunto: ${ticket.ticket_name}</p>
            <p>Descripción: ${ticket.description_ticket}</p>
          
                </div>
    </div>

</div>
`

    console.log("Se hace envio de notificación");
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
        from: '"Notificación" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Notificación", // Subject line
        text: "Se te asigno un ticket", // plain text body
        html: notificationForm, // html body
    });
    console.log("Envio exitoso de notificación");
}

const sendMailMaintenance = async (email, machine) => {
    const notificationForm =
        `
<div class=""
style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
<div class="headimg">
    <img width="25%" src="http://drive.google.com/uc?export=view&id=1q1gXiwbiu6xHil_kpT9WSDcR6dWke6yX" alt=""
        data-bit="iit" />
</div>
<div class="texthead">
    <h1>Maquina en mantenimiento</h1>
</div>
<div class="cont" style=" border-radius: 8px;">
    <h6>Se ha ingresado en mantenimiento la maquina:</h6>
    <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
    padding-left: 20px;">
        <p>ID: ${machine.id_machine}</p>
        <p>Nombre: ${machine.machine_name}</p>

        </div>
</div>

</div>
`

    console.log("Se hace envio de notificación");
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
        from: '"Notificación" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Maquina en mantenimiento", // Subject line
        text: "Maquina en mantenimiento", // plain text body
        html: notificationForm, // html body
    });
    console.log("Envio exitoso de notificación");
}

const sendVoucherOperations = async ( operation,cliente)=>{
    console.log('Recibimos la operacions');
    console.log(operation);
    console.log(cliente);
    const registerForm =
        `
        <div class=""
            style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
            <div class="headimg">
                <img width="25%" src="http://drive.google.com/uc?export=view&id=1q1gXiwbiu6xHil_kpT9WSDcR6dWke6yX" alt=""
                    data-bit="iit" />
            </div>
            <div class="texthead">
                <h1>Detalles de la operacion realizada</h1>
            </div>
            <div class="cont" style=" border-radius: 8px;">
                <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
                padding-left: 20px;">
                <p> Operacion Nro: ${'00000'+operation.id_operations}</p>
                    <p> Cliente: ${cliente.document}</p>
                    <p> Nombre y apellido: ${cliente.name +' '+ cliente.last_name}</p>
                    <p> Direccion: ${cliente.address}</p>
                    <p> Telfono: ${cliente.phone}</p>
                    <p> Comision: ${operation.commission}</p>
                    <p> Monto total: ${operation.amount +' USD'} </p>
                    <p> Fecha operacion: ${new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    `

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
        from: '"Operaciones" <notificaciones@brxsgo.com>', // sender address
        to: "marcecinco@fpuna.edu.py", // list of receivers
        subject: "Comprobante", // Subject line
        text: "Comprobante", // plain text body
        html: registerForm, // html body
    });

}


module.exports = {
    sendRegisterMail,
    resetPasswordMail,
    sendNotification,
    sendNotificationTkt,
    sendMailMaintenance,
    sendVoucherOperations
}