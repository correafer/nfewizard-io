import AxiosHttpClient from './AxiosHttpClient';
import HttpClientBuilder from './HttpClientBuilder';
import ValidateEnvironment from './ValidateEnvironment';
import LoadCertificate from './LoadCertificate';
class Environment {
    constructor(config) {
        this.config = config;
        this.certificate = '';
        this.cert_key = '';
        this.agent = {};
        this.isLoaded = false;
    }
    getIsLoaded() {
        return this.isLoaded;
    }
    getConfig() {
        return this.config;
    }
    getCertKey() {
        return this.cert_key;
    }
    getCert() {
        return this.certificate;
    }
    getHttpAgent() {
        return this.agent;
    }
    async loadEnvironment() {
        /**
         * Verifica configurações obrigatórias
         * */
        const validateEnvironment = new ValidateEnvironment();
        validateEnvironment.checkRequiredSettings(this.config);
        /**
         * Carrega Certificados
         * */
        const loadCertificate = new LoadCertificate(this.config);
        const { agent, certificate, cert_key } = await loadCertificate.loadCertificate();
        this.agent = agent;
        this.certificate = certificate;
        this.cert_key = cert_key;
        /**
         * Configura HttpClient
         * */
        const httpClient = new AxiosHttpClient();
        const configAgent = new HttpClientBuilder(this.config, this.agent, httpClient);
        const axios = configAgent.createHttpClient();
        /**
         * Armazena informação de ambiente carregado
         * */
        this.isLoaded = true;
        return { axios };
    }
}
export default Environment;
//# sourceMappingURL=Environment.js.map