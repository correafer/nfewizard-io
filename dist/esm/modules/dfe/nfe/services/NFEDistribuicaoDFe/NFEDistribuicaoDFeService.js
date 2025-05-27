import DistribuicaoHandler from './util/DistribuicaoHandler.js';
import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
class NFEDistribuicaoDFeService extends BaseNFE {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'NFeDistribuicaoDFe', axios, saveFiles, gerarConsulta);
    }
    gerarXml(data) {
        return this.gerarXmlNFeDistribuicaoDFe(data);
    }
    gerarXmlNFeDistribuicaoDFe(data) {
        const { nfe: { ambiente } } = this.environment.getConfig();
        //  XML
        const xmlObject = {
            $: {
                versao: "1.01",
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            tpAmb: ambiente,
            ...data,
        };
        return this.xmlBuilder.gerarXml(xmlObject, 'distDFeInt');
    }
    async Exec(data) {
        let xmlConsulta = '';
        let xmlConsultaSoap = '';
        let webServiceUrlTmp = '';
        let responseInJson = undefined;
        let xmlRetorno = {};
        const ContentType = this.setContentType();
        try {
            // Gerando XML para consulta de Status do Serviço
            xmlConsulta = this.gerarXmlNFeDistribuicaoDFe(data);
            const { xmlFormated, agent, webServiceUrl, action } = await this.gerarConsulta.gerarConsulta(xmlConsulta, this.metodo, true, '1.01', 'NFe', true, 'nfeDistDFeInteresse');
            xmlConsultaSoap = xmlFormated;
            webServiceUrlTmp = webServiceUrl;
            // Efetua requisição para o webservice NFEStatusServico
            xmlRetorno = await this.axios.post(webServiceUrl, xmlFormated, {
                headers: {
                    'Content-Type': ContentType,
                    'SOAPAction': action,
                },
                httpsAgent: agent
            });
            // Verifica se houve rejeição
            responseInJson = this.utility.verificaRejeicao(xmlRetorno.data, this.metodo);
            /**
             * Descompacta XML
             * Converte XML para Json
             * Salva XML
             * Gera erro em caso de rejeição
             */
            const handlerDistribuicao = new DistribuicaoHandler(this.environment, this.utility, this.metodo);
            const filesList = handlerDistribuicao.deCompressDFeXML(xmlRetorno.data, this.metodo, xmlConsulta);
            const xMotivo = this.utility.findInObj(responseInJson, 'xMotivo');
            return {
                data: responseInJson,
                xMotivo,
                filesList,
            };
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
            throw new Error(error.message);
        }
        finally {
            // Salva XML de Consulta
            this.utility.salvaConsulta(xmlConsulta, xmlConsultaSoap, this.metodo);
            // Salva XML de Retorno
            this.utility.salvaRetorno(xmlRetorno.data, responseInJson, this.metodo);
        }
    }
}
export default NFEDistribuicaoDFeService;
//# sourceMappingURL=NFEDistribuicaoDFeService.js.map