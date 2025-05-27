import { NFeWizardProps } from '../../../core/types/index';
import https from 'https';
import { HttpClient } from '../../../core/interfaces/index';
declare class HttpClientBuilder<T> {
    private config;
    private agent;
    private httpClient;
    constructor(config: NFeWizardProps, agent: https.Agent, httpClient: HttpClient<T>);
    createHttpClient(): T;
}
export default HttpClientBuilder;
