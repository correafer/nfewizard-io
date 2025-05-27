"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailController {
    constructor(environment) {
        this.environment = environment;
    }
    createTransporter(email) {
        const { host, port, secure, auth: { user, pass } } = email;
        // const transporter = nodemailer.createTransport(email);
        const transporter = nodemailer_1.default.createTransport({
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
exports.default = MailController;
//# sourceMappingURL=MailAdapter.js.map