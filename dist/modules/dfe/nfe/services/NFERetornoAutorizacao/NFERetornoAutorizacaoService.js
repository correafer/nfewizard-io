import BaseNFE from '../../../../dfe/base/BaseNFe.js';
class NFERetornoAutorizacaoService extends BaseNFE {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'NFERetAutorizacao', axios, saveFiles, gerarConsulta);
    }
    gerarXml(data) {
        try {
            const { nfe: { ambiente } } = this.environment.getConfig();
            const xmlObject = {
                $: {
                    xmlns: 'http://www.portalfiscal.inf.br/nfe',
                    versao: "4.00",
                },
                tpAmb: ambiente,
                nRec: data
            };
            return this.xmlBuilder.gerarXml(xmlObject, 'consReciNFe');
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Busca o retorno da Autorização pelo número do recibo (nRec)
     *
     * @param {string} nRec - Número do recibo retornado pela SEFAZ ao emitir uma NFe em modo assíncrono.
     * @param {any} xmlNFe - Array contendo as NFe do lote enviado à SEFAZ.
     * @returns {Promise<string>} XML completo da NFe (já com protocolo de autorização).
     */
    async getRetornoRecibo(nRec, xmlNFe) {
        try {
            /**
             * Gera o XML para consulta de acordo com o número do recibo da emissão (nRec)
             */
            const xmlConsulta = this.gerarXml(nRec);
            const { xmlFormated, agent, webServiceUrl, action } = await this.gerarConsulta.gerarConsulta(xmlConsulta, this.metodo);
            // Salva XML de Consulta
            this.utility.salvaConsulta(xmlConsulta, xmlFormated, this.metodo);
            // Efetua requisição para o webservice NFEStatusServico
            const xmlRetorno = await this.axios.post(webServiceUrl, xmlFormated, {
                headers: {
                    'Content-Type': this.setContentType(),
                    'SOAPAction': action,
                },
                httpsAgent: agent
            });
            const responseInJson = this.utility.verificaRejeicao(xmlRetorno.data, this.metodo);
            // Salva XML de Retorno
            this.utility.salvaRetorno(xmlRetorno.data, responseInJson, this.metodo);
            const { protNFe } = this.utility.getProtNFe(xmlRetorno.data);
            if (!protNFe) {
                throw new Error(`Não foi possível encontrar a tag 'protNFe'. Talvez a NFe ainda não tenha sido processada.`);
            }
            return this.getXmlRetornoAutorizacao(protNFe, xmlNFe);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Agrega o protNFe ao restante da NFe gerada na emissão.
     *
     * @param {string} protNFe - Tag protNFe do XML em formato JSON.
     * @param {any} xmlNFe - Array contendo as NFe do lote enviado à SEFAZ.
     * @returns {} XML completo da NFe (já com protocolo de autorização).
     */
    getXmlRetornoAutorizacao(protNFe, xmlNFe) {
        try {
            /**
             * Cria o Obj base da NFe já processada (nfeProc)
             */
            const XMLs = [];
            for (let i = 0; i < protNFe.length; i++) {
                const baseXML = {
                    $: {
                        versao: "4.00",
                        xmlns: 'http://www.portalfiscal.inf.br/nfe'
                    },
                    _: '[XML]'
                };
                let xml = this.xmlBuilder.gerarXml(baseXML, 'nfeProc');
                /**
                 * Converte a tag protNFe do formato JSON para XML e armazena na string protTag.
                 * Adiciona a tag protNFe (armazenada na string protTag) ao array contendo os dados das NFe.
                 */
                // Expressão regular para capturar o valor do atributo Id
                const formatedProtNFe = protNFe;
                const xmlCompleto = xmlNFe.find((item) => item.indexOf(formatedProtNFe[i].infProt[0].chNFe[0]) !== -1);
                if (xmlCompleto) {
                    const protTag = this.xmlBuilder.gerarXml(protNFe[i], 'protNFe');
                    const xmlFinal = [xmlCompleto];
                    xmlFinal.push(protTag);
                    /**
                     * Substitui o "[XML]" com as tags NFe e a tag protNFe
                     */
                    xml = xml.replace('[XML]', xmlFinal.join(''));
                    xml = `<?xml version="1.0" encoding="UTF-8"?>${xml}`;
                    XMLs.push(xml);
                }
            }
            return {
                success: true,
                message: 'xMotivo',
                data: XMLs
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Retorna o XML completo da Autorização (já com o protocolo de autorização)
     *
     * @param {number} tipoEmissao - Informa se o tipo emissão foi síncrona ou assíncrona (0- Não / 1 - Sim).
     * @param {string | undefined} nRec - Número do recibo retornado pela SEFAZ ao emitir uma NFe em modo assíncrono.
     * @param {ProtNFe | undefined} protNFe - Tag protNFe do XML em formato JSON.
     * @param {string[]} xmlNFe - Array contendo as NFe do lote enviado à SEFAZ.
     * @returns {Promise<string>} XML completo da NFe (já com protocolo de autorização).
     */
    async getXmlRetorno({ tipoEmissao, nRec, protNFe, xmlNFe }) {
        try {
            /**
             * Trata retorno Síncrono
             */
            if (tipoEmissao === 1 && protNFe) {
                return this.getXmlRetornoAutorizacao(protNFe, xmlNFe);
            }
            /**
             * Trata retorno Assíncrono
             */
            if (tipoEmissao === 0 && nRec) {
                return this.getRetornoRecibo(nRec, xmlNFe);
            }
            throw new Error('Não foi possível buscar o retorno da autorização.');
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
export default NFERetornoAutorizacaoService;
//# sourceMappingURL=NFERetornoAutorizacaoService.js.map