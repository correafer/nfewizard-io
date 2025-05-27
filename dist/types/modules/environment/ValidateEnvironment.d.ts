import { NFeWizardProps } from '../../../core/types/index';
declare class ValidateEnvironment {
    checkRequiredSettings(config: NFeWizardProps): {
        missingConfigurations: any;
        message: string;
        success: boolean;
    };
}
export default ValidateEnvironment;
