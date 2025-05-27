"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosHttpClient_1 = __importDefault(require("./AxiosHttpClient.cjs"));
const HttpClientBuilder_1 = __importDefault(require("./HttpClientBuilder.cjs"));
const ValidateEnvironment_1 = __importDefault(require("./ValidateEnvironment.cjs"));
const LoadCertificate_1 = __importDefault(require("./LoadCertificate.cjs"));
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
        const validateEnvironment = new ValidateEnvironment_1.default();
        validateEnvironment.checkRequiredSettings(this.config);
        /**
         * Carrega Certificados
         * */
        const loadCertificate = new LoadCertificate_1.default(this.config);
        const { agent, certificate, cert_key } = await loadCertificate.loadCertificate();
        this.agent = agent;
        this.certificate = certificate;
        this.cert_key = cert_key;
        /**
         * Configura HttpClient
         * */
        const httpClient = new AxiosHttpClient_1.default();
        const configAgent = new HttpClientBuilder_1.default(this.config, this.agent, httpClient);
        const axios = configAgent.createHttpClient();
        /**
         * Armazena informação de ambiente carregado
         * */
        this.isLoaded = true;
        return { axios };
    }
}
exports.default = Environment;
//# sourceMappingURL=Environment.js.map