"use strict";
/**
    * @description      :
    * @author           :
    * @group            :
    * @created          : 21/03/2025 - 21:50:20
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/03/2025
    * - Author          :
    * - Modification    :
**/
/*
 * This file is part of NFeWizard-io.
 *
 * NFeWizard-io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NFeWizard-io is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NFeWizard-io. If not, see <https://www.gnu.org/licenses/>.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xsd_schema_validator_1 = __importDefault(require("xsd-schema-validator"));
const NFeServicosUrl_json_1 = __importDefault(require("../config/NFeServicosUrl.json"));
const soapMethod_json_1 = __importDefault(require("../config/soapMethod.json"));
const SchemaLoader_1 = require("../../adapters/SchemaLoader.cjs");
const XmlParser_1 = __importDefault(require("./XmlParser.cjs"));
const xml2js_1 = __importDefault(require("xml2js"));
const libxmljs_1 = __importDefault(require("libxmljs"));
const xsd_assembler_1 = __importDefault(require("xsd-assembler"));
class Utility {
    constructor(environment) {
        /**
         * Função recursiva para encontrar a chave em qualquer nivel do objeto
         */
        this.findInObj = (obj, chave) => {
            if (obj.hasOwnProperty(chave)) {
                return obj[chave];
            }
            for (let prop in obj) {
                if (typeof obj[prop] === 'object') {
                    const result = this.findInObj(obj[prop], chave); // Passar a chave aqui
                    if (result) {
                        return result;
                    }
                }
            }
            return '';
        };
        this.environment = environment;
        this.xmlParser = new XmlParser_1.default();
    }
    /**
     * Método utilitário para criar diretórios
     */
    createDir(path) {
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path, { recursive: true });
        }
    }
    /**
     * Método utilitário para escrever arquivo
     */
    createFile(path, fileName, file, extension) {
        if (extension.toLowerCase() === 'json') {
            fs_1.default.writeFileSync(`${path}/${fileName}.${extension}`, JSON.stringify(file));
        }
        else {
            fs_1.default.writeFileSync(`${path}/${fileName}.${extension}`, file);
        }
    }
    /**
     * Método responsável por gravar o XML como json
     */
    salvaJSON(props) {
        const { fileName, metodo, path, data } = props;
        try {
            let pathJson = path;
            if (!pathJson || pathJson.trim() === '') {
                pathJson = `../tmp/${metodo}/`;
            }
            // Utiliza a função recursiva para encontrar a chave chNFe
            // const chNFe = this.findInObj(json, 'chNFe');
            this.createDir(pathJson);
            this.createFile(pathJson, fileName, data, 'json');
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Método responsável por gravar os XML recebidos em disco
     */
    salvaXMLFromJson(config, xmlInJson, fileName = "", metodo = "") {
        try {
            let pathXml = config.dfe.pathXMLRetorno;
            if (!pathXml || pathXml.trim() === '') {
                pathXml = `../tmp/${metodo}/`;
            }
            const { xml } = xmlInJson;
            // Utiliza a função recursiva para encontrar a chave chNFe
            const chNFe = this.findInObj(xmlInJson, 'chNFe');
            this.createDir(pathXml);
            this.createFile(pathXml, fileName || chNFe, xml, 'xml');
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    salvaXML(props) {
        const { fileName, metodo, path, data } = props;
        try {
            let pathXml = path;
            if (!pathXml || pathXml.trim() === '') {
                pathXml = `../tmp/${metodo}/`;
            }
            // busca a chave chNFe
            // xml2js.parseString(xml, (err, result) => {
            //     if (err) {
            //         console.error('Erro ao parsear o XML para captura do chNFe:', err);
            //     } else {
            //         console.log(result);
            //     }
            // });
            this.createDir(pathXml);
            this.createFile(pathXml, fileName, data, 'xml');
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Recupera url para action e metoodo do SOAP
     */
    getSoapInfo1(uf, metodo) {
        const methodConfig = soapMethod_json_1.default;
        const methodInfo = methodConfig[metodo];
        if (!methodInfo) {
            throw new Error("Método não encontrado no arquivo de configuração SOAP.");
        }
        return {
            method: methodInfo.method,
            action: methodInfo.action,
        };
    }
    getSoapInfo(uf, method) {
        const servicos = NFeServicosUrl_json_1.default;
        let chaveMethod = '';
        let chaveSoap = '';
        switch (uf) {
            case 'SP':
                chaveSoap = 'SOAP_V4_SP';
                break;
            case 'BA':
                chaveSoap = 'SOAP_V4_BA';
                break;
            default:
                chaveSoap = 'SOAP_V4';
                break;
        }
        switch (uf) {
            case 'SP':
                chaveMethod = 'WSDL_V4_SP';
                break;
            default:
                chaveMethod = 'WSDL_V4';
                break;
        }
        const methodServices = servicos[chaveMethod];
        const methodUrl = this.getLatestURLConsulta(methodServices, method);
        const soapServices = servicos[chaveSoap];
        const soapUrl = this.getLatestURLConsulta(soapServices, method);
        if (!methodUrl || !soapUrl) {
            throw new Error("Método não encontrado no arquivo de configuração SOAP.");
        }
        return {
            method: methodUrl,
            action: soapUrl,
        };
    }
    /**
     * Marco, adicionei este metodo para concatenar todas url incluido as na Usar, mas no fim nao precisei usar por enquanto
     * @param chave
     * @returns
     */
    getLatestURLConsultaFix(chave) {
        const urls = NFeServicosUrl_json_1.default;
        const temp_urls = { ...urls[chave] };
        if ('Usar' in temp_urls) {
            const referencedChave = temp_urls['Usar'];
            const referencedUrls = urls[referencedChave] || {};
            Object.keys(referencedUrls).forEach((key) => {
                if (!(key in temp_urls)) {
                    temp_urls[key] = referencedUrls[key];
                }
            });
            delete temp_urls['Usar'];
        }
        return temp_urls;
    }
    getLatestURLConsulta(data, metodo) {
        // Obtem todas as chaves do objeto
        const keys = Object.keys(data);
        // Monta o prefixo dinâmico com base no método fornecido
        const prefix = `${metodo}_`;
        // Filtra as chaves que começam com o prefixo dinâmico e extrai as versões
        const versions = keys
            .map(key => {
            const match = key.match(new RegExp(`^${prefix}(\\d+\\.\\d+)$`));
            return match ? parseFloat(match[1]) : null; // Extrai a versão como número
        })
            .filter(version => version !== null) // Remove versões que não existem
            .sort((a, b) => b - a); // Ordena em ordem decrescente
        // Busca a primeira URL que corresponder à versão mais alta
        for (let version of versions) {
            const key = `${prefix}${version.toFixed(2)}`; // Formata a chave
            if (data[key]) {
                return data[key]; // Retorna a URL encontrada
            }
        }
        // Caso não encontre nenhuma versão numerada, retorna a URL sem versão
        return data[metodo] || null;
    }
    ;
    /**
     * Define o ambiente (UF e Produção ou Homologação) para geração das chaves de recuperação da URL do webservice
     */
    setAmbiente(metodo, ambienteNacional = false, versao, mod) {
        const config = this.environment.getConfig();
        const ambiente = config.nfe.ambiente === 2 ? 'H' : 'P';
        const versaoDF = versao !== "" ? versao : config.nfe.versaoDF;
        if (ambienteNacional) {
            const chaveMae = `${mod}_AN_${ambiente}`;
            const chaveFilha = `${metodo}_${versaoDF}`;
            return { chaveMae, chaveFilha };
        }
        const chaveMae = `${mod}_${config.dfe.UF}_${ambiente}`;
        const chaveFilha = `${metodo}_${versaoDF}`;
        return { chaveMae, chaveFilha };
    }
    /**
     * Retorna a url correta do webservice
     */
    getWebServiceUrl(metodo, ambienteNacional = false, versao = "", mod = "NFe") {
        let { chaveMae, chaveFilha } = this.setAmbiente(metodo, ambienteNacional, versao, mod);
        const urls = NFeServicosUrl_json_1.default;
        if ('Usar' in urls[chaveMae])
            chaveMae = urls[chaveMae].Usar;
        const url = urls[chaveMae] && urls[chaveMae][chaveFilha];
        if (!url) {
            throw new Error(`Não foi possível recuperar a url para o webservice: ${chaveFilha}`);
        }
        return url;
    }
    getUrlNFCe(metodo, ambienteNacional = false, versao = "") {
        let { chaveMae } = this.setAmbiente(metodo, ambienteNacional, versao, 'NFCe');
        const urls = NFeServicosUrl_json_1.default;
        // removendo este codigo funciona
        // if ('Usar' in urls[chaveMae]){
        //     chaveMae = urls[chaveMae].Usar
        // }
        // const tempUrls = this.getLatestURLConsultaFix(chaveMae);
        // const urlnew =tempUrls[metodo];
        // const chaveFilha = this.getLatestURLConsulta(urls[chaveMae], metodo);
        const url = urls[chaveMae] && this.getLatestURLConsulta(urls[chaveMae], metodo);
        if (!url) {
            throw new Error(`Não foi possível recuperar a url para consulta de NFCe: ${chaveMae}`);
        }
        return url;
    }
    /**
     * Função para validar XML com Schema
     */
    formatErrorMessage(message) {
        // Esta função extrai e formata a mensagem de erro
        const regex = /\[error\]\s(.+?)\:\s(.+?)\s\((\d+):(\d+)\)/;
        const match = message.match(regex);
        if (match) {
            const [_, errorCode, errorDescription, line, column] = match;
            return `Erro na Validação do XML: ${errorCode} na linha ${line}, coluna ${column}. Descrição: ${errorDescription}`;
        }
        else {
            return `Erro Não Identificado na Validação do XML: ${message}`; // Retorna a mensagem original se ela não corresponder ao formato esperado
        }
    }
    validateSchemaJsBased(xml, metodo) {
        return new Promise(async (resolve, reject) => {
            try {
                const { basePath, schemaPath } = (0, SchemaLoader_1.getSchema)(metodo);
                const completeXSD = await xsd_assembler_1.default.assemble(schemaPath);
                const xmlDoc = libxmljs_1.default.parseXml(xml);
                const xsdDoc = libxmljs_1.default.parseXml(completeXSD, { baseUrl: `${basePath}/` });
                const isValid = xmlDoc.validate(xsdDoc);
                if (isValid) {
                    resolve({
                        success: true,
                        message: 'XML válido.',
                    });
                }
                else {
                    reject({
                        success: false,
                        message: this.formatErrorMessage(xmlDoc.validationErrors[0].message),
                    });
                }
            }
            catch (error) {
                reject({
                    success: false,
                    message: this.formatErrorMessage(error.message),
                });
            }
        });
    }
    validateSchemaJavaBased(xml, metodo) {
        return new Promise(async (resolve, reject) => {
            try {
                const { schemaPath } = (0, SchemaLoader_1.getSchema)(metodo);
                xsd_schema_validator_1.default.validateXML(xml, schemaPath, (err, validationResult) => {
                    if (err) {
                        reject({
                            success: false,
                            message: this.formatErrorMessage(err.message),
                        });
                    }
                    else if (!validationResult.valid) {
                        reject({
                            success: false,
                            message: this.formatErrorMessage(validationResult.messages[0]),
                        });
                    }
                    else {
                        resolve({
                            success: true,
                            message: 'XML válido.',
                        });
                    }
                });
            }
            catch (error) {
                reject({
                    success: false,
                    message: this.formatErrorMessage(error.message),
                });
            }
        });
    }
    verificaRejeicao(data, metodo, name) {
        const responseInJson = this.xmlParser.convertXmlToJson(data, metodo);
        // Gera erro em caso de Rejeição
        const xMotivo = this.findInObj(responseInJson, 'xMotivo');
        const infProt = this.findInObj(responseInJson, 'infProt');
        // Salva XML de retorno
        this.salvaRetorno(data, responseInJson, metodo, name);
        // Gera erro em caso de Rejeição
        if (xMotivo && (xMotivo.includes('Rejeição') || xMotivo.includes('Rejeicao'))) {
            throw new Error(xMotivo);
        }
        if (infProt && (infProt?.xMotivo.includes('Rejeição') || infProt?.xMotivo.includes('Rejeicao'))) {
            throw new Error(infProt?.xMotivo);
        }
        // if (infEvento && (infEvento?.xMotivo.includes('Rejeição') || infEvento?.xMotivo.includes('Rejeicao'))) {
        //     throw new Error(xMotivo);
        // }
        return responseInJson;
    }
    getProtNFe(xmlRetorno) {
        let nRec = '';
        let protNFe;
        xml2js_1.default.parseString(xmlRetorno, (err, result) => {
            if (err) {
                console.error('Erro ao parsear o XML para captura do nRec e protNFe:', err);
            }
            else {
                const nRecTag = this.findInObj(result, 'nRec');
                nRec = nRecTag[0];
                const protNFeTag = this.findInObj(result, 'protNFe');
                protNFe = protNFeTag;
            }
        });
        return {
            protNFe,
            nRec
        };
    }
    getRequestLogFileName(metodo, tipo) {
        switch (metodo) {
            case 'NFEStatusServico':
                return `NFeStatusServico-${tipo}`;
            case 'NFEConsultaProtocolo':
                return `NFeConsultaProtocolo-${tipo}`;
            case 'NFeDistribuicaoDFe':
                return `NFeDistribuicaoDFe-${tipo}`;
            case 'RecepcaoEvento':
                return `RecepcaoEvento-${tipo}`;
            case 'NFECancelamento':
                return `NFECancelamento-${tipo}`;
            case 'NFEInutilizacao':
                return `NFEInutilizacao-${tipo}`;
            case 'NFEAutorizacao':
                return `NFEAutorizacao-${tipo}`;
            case 'NFCEAutorizacao':
                return `NFCEAutorizacao-${tipo}`;
            case 'NFERetAutorizacao':
                return `NFERetAutorizacao-${tipo}`;
            default:
                throw new Error('Erro: Requisição de nome para método não implementado.');
        }
    }
    salvaConsulta(xmlConsulta, xmlFormated, metodo, name) {
        try {
            const fileName = name || this.getRequestLogFileName(metodo, 'consulta');
            const { armazenarXMLConsulta, pathXMLConsulta, armazenarXMLConsultaComTagSoap } = this.environment.config.dfe;
            const xmlConsultaASalvar = armazenarXMLConsultaComTagSoap ? xmlFormated : xmlConsulta;
            if (armazenarXMLConsulta) {
                this.salvaXML({
                    data: xmlConsultaASalvar,
                    fileName,
                    metodo,
                    path: pathXMLConsulta,
                });
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    salvaRetorno(xmlRetorno, responseInJson, metodo, name) {
        try {
            const fileName = name || this.getRequestLogFileName(metodo, 'retorno');
            const { armazenarXMLRetorno, pathXMLRetorno, armazenarRetornoEmJSON } = this.environment.config.dfe;
            if (armazenarXMLRetorno && xmlRetorno) {
                this.salvaXML({
                    data: xmlRetorno,
                    fileName,
                    metodo,
                    path: pathXMLRetorno,
                });
                if (armazenarRetornoEmJSON && responseInJson) {
                    this.salvaJSON({
                        data: responseInJson,
                        fileName,
                        metodo,
                        path: pathXMLRetorno,
                    });
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = Utility;
//# sourceMappingURL=Utility.js.map