import https from 'https';
import { NFeWizardProps } from 'src/core/types';
import { AxiosInstance } from 'axios';
declare class Environment {
    config: NFeWizardProps;
    certificate: string;
    cert_key: string;
    agent: https.Agent;
    isLoaded: boolean;
    constructor(config: NFeWizardProps);
    getIsLoaded(): boolean;
    getConfig(): NFeWizardProps;
    getCertKey(): string;
    getCert(): string;
    getHttpAgent(): https.Agent;
    loadEnvironment(): Promise<{
        axios: AxiosInstance;
    }>;
}
export default Environment;
