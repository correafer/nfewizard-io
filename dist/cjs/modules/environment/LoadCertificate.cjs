"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const pem_1 = __importDefault(require("pem"));
const https_1 = __importDefault(require("https"));
const node_forge_1 = __importDefault(require("node-forge"));
const path_1 = __importDefault(require("path"));
const baseDir = __dirname;
const dir = process.env.NODE_ENV === 'production' ? '../resources/certs' : '../../resources/certs';
class LoadCertificate {
    constructor(config) {
        this.config = config;
        this.certificate = '';
        this.cert_key = '';
    }
    loadCertificateWithPEM() {
        return new Promise((resolve, reject) => {
            try {
                const pfxPath = this.config.dfe.pathCertificado;
                const pfxPassword = this.config.dfe.senhaCertificado;
                const pfxFile = fs_1.default.readFileSync(pfxPath);
                const certsDir = path_1.default.resolve(baseDir, dir);
                const caCerts = fs_1.default.readdirSync(certsDir).map(filename => {
                    const tmp = `${certsDir}/${filename}`;
                    return fs_1.default.readFileSync(tmp);
                });
                pem_1.default.readPkcs12(pfxFile, { p12Password: pfxPassword }, async (error, result) => {
                    if (error) {
                        if (error.message.toLowerCase().includes('mac verify error')) {
                            return reject(new Error("Erro ao ler o certificado: Senha incorreta."));
                        }
                        else {
                            return reject(new Error(`Erro ao ler o certificado: ${error.message}`));
                        }
                    }
                    const key = result.key;
                    this.cert_key = key;
                    const cert = result.cert;
                    this.certificate = cert;
                    const certForge = node_forge_1.default.pki.certificateFromPem(cert);
                    const now = new Date();
                    if (now < certForge.validity.notBefore || now > certForge.validity.notAfter) {
                        return reject(new Error("Erro ao carregar o certificado: O certificado fornecido expirou ou ainda não é válido."));
                    }
                    const agent = new https_1.default.Agent({
                        key: key,
                        cert: cert,
                        ca: caCerts,
                    });
                    resolve({
                        success: true,
                        agent,
                        message: 'Certificado Carregado com Sucesso.'
                    });
                });
            }
            catch (error) {
                reject(new Error(error.message));
            }
        });
    }
    loadCertificateWithNodeForge() {
        return new Promise((resolve, reject) => {
            try {
                const pfxPath = this.config.dfe.pathCertificado;
                const pfxPassword = this.config.dfe.senhaCertificado;
                // Lê o arquivo PFX
                const pfxFile = fs_1.default.readFileSync(pfxPath);
                // Decodifica o arquivo PFX (PKCS#12)
                const p12Asn1 = node_forge_1.default.asn1.fromDer(pfxFile.toString('binary'));
                const p12 = node_forge_1.default.pkcs12.pkcs12FromAsn1(p12Asn1, pfxPassword);
                // Extrai a chave privada e o certificado
                const keyBags = p12.getBags({ bagType: node_forge_1.default.pki.oids.pkcs8ShroudedKeyBag });
                const certBags = p12.getBags({ bagType: node_forge_1.default.pki.oids.certBag });
                // Verificar se o 'keyBags' contém a chave esperada
                const key = keyBags[node_forge_1.default.pki.oids.pkcs8ShroudedKeyBag]?.[0]?.key;
                if (!key) {
                    return reject(new Error("Erro ao carregar chave privada do certificado."));
                }
                const keyPem = node_forge_1.default.pki.privateKeyToPem(key);
                this.cert_key = keyPem;
                // Verificar se o 'certBags' contém o certificado esperado
                const cert = certBags[node_forge_1.default.pki.oids.certBag]?.[0]?.cert;
                if (!cert) {
                    return reject(new Error("Erro ao carregar certificado."));
                }
                const certPem = node_forge_1.default.pki.certificateToPem(cert);
                this.certificate = certPem;
                // Converte o certificado para o formato Forge
                const certForge = node_forge_1.default.pki.certificateFromPem(node_forge_1.default.pki.certificateToPem(cert));
                // Valida a data de validade
                const now = new Date();
                if (now < certForge.validity.notBefore || now > certForge.validity.notAfter) {
                    return reject(new Error("Erro ao carregar o certificado: O certificado fornecido expirou ou ainda não é válido."));
                }
                // Carrega os certificados da CA
                const certsDir = path_1.default.resolve(baseDir, dir);
                const caCerts = fs_1.default.readdirSync(certsDir).map(filename => {
                    const tmp = `${certsDir}/${filename}`;
                    return fs_1.default.readFileSync(tmp);
                });
                // Configura o agente HTTPS
                const agent = new https_1.default.Agent({
                    key: keyPem,
                    cert: certPem,
                    ca: caCerts,
                });
                resolve({
                    success: true,
                    agent,
                    message: 'Certificado Carregado com Sucesso.'
                });
            }
            catch (error) {
                reject(new Error(error.message));
            }
        });
    }
    async loadCertificate() {
        if (this.config.lib?.useOpenSSL || this.config.lib?.useOpenSSL === undefined) {
            const { agent } = await this.loadCertificateWithPEM();
            return {
                certificate: this.certificate,
                cert_key: this.cert_key,
                agent
            };
        }
        const { agent } = await this.loadCertificateWithNodeForge();
        return {
            certificate: this.certificate,
            cert_key: this.cert_key,
            agent
        };
    }
}
exports.default = LoadCertificate;
//# sourceMappingURL=LoadCertificate.js.map