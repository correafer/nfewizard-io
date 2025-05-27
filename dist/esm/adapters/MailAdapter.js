import nodemailer from 'nodemailer';
class MailController {
    constructor(environment) {
        this.environment = environment;
    }
    createTransporter(email) {
        const { host, port, secure, auth: { user, pass } } = email;
        // const transporter = nodemailer.createTransport(email);
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass,
            },
        });
        return transporter;
    }
    mountMail(email, mailParams) {
        const { emailParams: { from, to } } = email;
        const { message, subject, attachments } = mailParams;
        const attachmentsWithVerifiedFileName = attachments?.map((attachment) => {
            if (!attachment.filename) {
                attachment.filename = false;
            }
            return attachment;
        });
        return {
            from,
            to,
            subject,
            html: message,
            attachments: attachmentsWithVerifiedFileName,
        };
    }
    sendEmail(mailParams) {
        try {
            const { email } = this.environment.getConfig();
            if (!email) {
                throw new Error('Email não configurado. Para utilizar o envio de e-mail certifique-se de passar as configurações corretas para o método "NFE_LoadEnvironment".');
            }
            const transporter = this.createTransporter(email);
            const mailOptions = this.mountMail(email, mailParams);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    throw new Error(error);
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao enviar e-mail: ${error.message}`);
        }
    }
}
export default MailController;
//# sourceMappingURL=MailAdapter.js.map