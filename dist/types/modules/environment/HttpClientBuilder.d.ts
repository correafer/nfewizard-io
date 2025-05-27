import { NFeWizardProps } from '@Types';
import https from 'https';
import { HttpClient } from '@Interfaces';
declare class HttpClientBuilder<T> {
    private config;
    private agent;
    private httpClient;
    constructor(config: NFeWizardProps, agent: https.Agent, httpClient: HttpClient<T>);
    createHttpClient(): T;
}
export default HttpClientBuilder;
