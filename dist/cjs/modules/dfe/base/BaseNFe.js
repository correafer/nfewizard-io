import XmlParser from '../../../core/utils/XmlParser.js';
class BaseNFE {
    constructor(environment, utility, xmlBuilder, metodo, axios, saveFiles, gerarConsulta) {
        this.environment = environment;
        this.utility = utility;
        this.xmlBuilder = xmlBuilder;
        this.metodo = metodo;
        this.axios = axios;
        this.saveFiles = saveFiles;
        this.gerarConsulta = gerarConsulta;
        this.chaveNfe = "";
    }
    /**
     * Método de geração do XML - Deve ser implementado pelas subclasses
     */
    gerarXml(data) {
        throw new Error("O método 'gerarXml' não foi implementado na subclasse.");
    }
    setContentType() {
        const UF = this.environment.config.dfe.UF;
        const ufsAppSoad = ['MG', 'GO', 'MT', 'MS', 'AM'];
        if (ufsAppSoad.includes(UF)) {
            return 'application/soap+xml';
        }
        return 'text/xml; charset=utf-8';
    }
    /**
     * Executa a requisição ao webservice SEFAZ
     * @param {any} [data] - Dados opcionais usados para gerar o XML em algumas subclasses.
     * @returns {Promise<any>} A resposta do webservice em JSON.
     */
    async Exec(data) {
        let xmlConsulta = '';
        let xmlConsultaSoap = '';
        let webServiceUrlTmp = '';
        let responseInJson = undefined;
        let xmlRetorno = {};
        const ContentType = this.setContentType();
        try {
            // Gerando XML específico
            xmlConsulta = this.gerarXml(data);
            const { xmlFormated, agent, webServiceUrl } = await this.gerarConsulta.gerarConsulta(xmlConsulta, this.metodo);
            xmlConsultaSoap = xmlFormated;
            webServiceUrlTmp = webServiceUrl;
            // Efetua requisição para o webservice NFEStatusServico
            xmlRetorno = await this.axios.post(webServiceUrl, xmlFormated, {
                headers: {
                    'Content-Type': ContentType,
                },
                httpsAgent: agent
            });
            // Instanciando classe de utilitários com lib xml-js e convertendo XML para XmlParser
            const json = new XmlParser();
            responseInJson = json.convertXmlToJson(xmlRetorno.data, this.metodo);
            // Gera erro em caso de Rejeição
            if (responseInJson.xMotivo.includes('Rejeição')) {
                throw new Error(responseInJson.xMotivo);
            }
            return responseInJson;
        }
        catch (error) {
            // const logConfig = this.environment.config.lib?.log;
            // if (logConfig) {
            //     const { armazenarLogs } = logConfig;
            //     if (armazenarLogs) {
            //         logger.error({
            //             message: error.message,
            //             webServiceUrl: webServiceUrlTmp,
            //             contentType: ContentType,
            //             xmlSent: xmlConsultaSoap,
            //             xmlResponse: error.response?.data || 'Sem resposta',
            //         });
            //     }
            // }
            // console.log(error)
            throw new Error(error.message);
        }
        finally {
            this.saveFiles.salvaArquivos(xmlConsulta, responseInJson, xmlRetorno, this.metodo, xmlConsultaSoap);
        }
    }
}
export default BaseNFE;
//# sourceMappingURL=BaseNFe.js.map