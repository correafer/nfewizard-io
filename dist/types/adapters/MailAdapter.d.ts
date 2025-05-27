import Environment from '@Modules/environment/Environment.js';
import { EmailParams } from 'src/core/types';
declare class MailController {
    private environment;
    constructor(environment: Environment);
    private createTransporter;
    private mountMail;
    sendEmail(mailParams: EmailParams): void;
}
export default MailController;
