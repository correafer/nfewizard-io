"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseNFe_js_1 = __importDefault(require("@Modules/dfe/base/BaseNFe.js"));
class NFERecepcaoEventoService extends BaseNFe_js_1.default {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'RecepcaoEvento', axios, saveFiles, gerarConsulta);
        this.tpEvento = '';
        this.modelo = 'NFe';
        this.xmlEventosNacionais = [];
        this.xmlEventosRegionais = [];
        this.xMotivoPorEvento = [];
        console.log('constructor recepcao evento service');
    }
    /**
     * Método para gerar o Id do evento
     */
    getID(evento) {
        const { tpEvento, chNFe, nSeqEvento } = evento;
        // Validação do tipo do evento (tpEvento)
        if (typeof tpEvento !== 'string' || !/^\d{6}$/.test(tpEvento)) {
            throw new Error('tpEvento deve ser uma string com 6 dígitos.');
        }
        // Validação da chave da NF-e (chNFe)
        if (typeof chNFe !== 'string' || !/^\d{44}$/.test(chNFe)) {
            throw new Error('chNFe deve ser uma string com 44 dígitos.');
        }
        // Validação do número sequencial do evento (nSeqEvento)
        if (!Number.isInteger(nSeqEvento) || nSeqEvento < 1 || nSeqEvento > 99) {
            throw new Error('nSeqEvento deve ser um número entre 1 e 99.');
        }
        // Preenchendo o número sequencial do evento com zeros à esquerda
        const nSeqEventoPadded = nSeqEvento.toString().padStart(2, '0');
        // Construção do ID
        const id = `ID${tpEvento}${chNFe}${nSeqEventoPadded}`;
        // Verificação do comprimento do ID
        if (id.length !== 54) {
            throw new Error('O ID construído não tem 54 caracteres.');
        }
        return id; // Retorna o ID validado
    }
    /**
     * Verifica se o evento será disparado para o ambiente nacional ou para o estado pré-definido
     */
    isAmbienteNacional(tpEvento) {
        switch (tpEvento) {
            case '210210':
                return true;
            case '210200':
                return true;
            case '210220':
                return true;
            case '210240':
                return true;
            case '110140':
                return true;
            case '110110':
                return false;
            default:
                return false;
        }
    }
    /**
     * Retorna o nome do Evento
     */
    getTipoEventoName(tpEvento) {
        switch (tpEvento) {
            case '210210':
                return 'Ciência da Operação';
            case '210200':
                return 'Confirmação da Operaçã';
            case '210220':
                return 'Desconhecimento da Operação';
            case '210240':
                return 'Operação não Realizada';
            case '110110':
                return 'Carta de Correção';
            case '110111':
                return 'Cancelamento';
            case '110140':
                return 'EPEC';
            default:
                return 'Desconhecido';
        }
    }
    separaEventosPorAmbiente(evento) {
        const nacional = evento.filter(event => ['210210', '210200', '210220', '210240', '110140'].includes(event.tpEvento));
        const regional = evento.filter(event => !['210210', '210200', '210220', '210240', '110140'].includes(event.tpEvento));
        return { nacional, regional };
    }
    /**
     * Criação do XML
     */
    gerarXmlRecepcaoEvento(evento, idLote, ambienteNacional) {
        const { nfe: { ambiente, versaoDF }, dfe: { UF } } = this.environment.getConfig();
        for (let i = 0; i < evento.length; i++) {
            const eventoProps = evento[i];
            const { tpAmb, cOrgao, tpEvento, chNFe, nSeqEvento, CNPJ, CPF, detEvento, dhEvento, verEvento } = eventoProps;
            const idEvento = this.getID(eventoProps);
            // const ambienteNacional = this.isAmbienteNacional(tpEvento);
            const orgao = ambienteNacional ? 91 : cOrgao;
            this.tpEvento = tpEvento;
            //  XML parte 1
            const eventoObject = {
                $: {
                    versao: "1.00",
                    xmlns: 'http://www.portalfiscal.inf.br/nfe'
                },
                infEvento: {
                    $: {
                        Id: idEvento,
                    },
                    cOrgao: orgao,
                    tpAmb: ambiente,
                    ...(CNPJ ? { CNPJ } : { CPF }),
                    chNFe: chNFe,
                    dhEvento: dhEvento,
                    tpEvento: tpEvento,
                    nSeqEvento: nSeqEvento,
                    verEvento: verEvento,
                    detEvento: {
                        $: {
                            versao: "1.00",
                        },
                        ...detEvento,
                    },
                }
            };
            // Gera primeira parte do XML
            const eventoXML = this.xmlBuilder.gerarXml(eventoObject, 'evento');
            const xmlAssinado = this.xmlBuilder.assinarXML(eventoXML, 'infEvento');
            if (ambienteNacional) {
                this.xmlEventosNacionais.push(xmlAssinado);
            }
            else {
                this.xmlEventosRegionais.push(xmlAssinado);
            }
        }
        // XML parte 2
        const envEvento = {
            $: {
                versao: "1.00",
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            idLote,
            _: '[XML]'
        };
        // Gera Segunda parte do XML
        const xml = this.xmlBuilder.gerarXml(envEvento, 'envEvento');
        if (ambienteNacional) {
            return xml.replace('[XML]', this.xmlEventosNacionais.join(''));
        }
        return xml.replace('[XML]', this.xmlEventosRegionais.join(''));
    }
    trataRetorno(responseInJson) {
        const retornoEventos = this.utility.findInObj(responseInJson, 'retEvento');
        if (retornoEventos instanceof Array) {
            for (let i = 0; i < retornoEventos.length; i++) {
                const chNFe = retornoEventos[i].infEvento.chNFe;
                const xMotivo = retornoEventos[i].infEvento.xMotivo;
                const cStat = retornoEventos[i].infEvento.cStat;
                const tipoEvento = this.getTipoEventoName(retornoEventos[i].infEvento.tpEvento);
                this.xMotivoPorEvento.push({
                    chNFe,
                    xMotivo,
                    cStat,
                    tipoEvento
                });
            }
            return this.xMotivoPorEvento;
        }
        const chNFe = retornoEventos.infEvento.chNFe;
        const xMotivo = retornoEventos.infEvento.xMotivo;
        const cStat = retornoEventos.infEvento.cStat;
        const tipoEvento = this.getTipoEventoName(retornoEventos.infEvento.tpEvento);
        this.xMotivoPorEvento.push({
            chNFe,
            xMotivo,
            cStat,
            tipoEvento
        });
        return this.xMotivoPorEvento;
    }
    async enviaEvento(evento, idLote, tipoAmbiente) {
        let xmlConsulta = '';
        let xmlConsultaSoap = '';
        let webServiceUrlTmp = '';
        const ContentType = this.setContentType();
        const ambienteNacional = tipoAmbiente === 0 ? true : false;
        try {
            // Gerando XML para consulta de Status do Serviço
            xmlConsulta = this.gerarXmlRecepcaoEvento(evento, idLote, ambienteNacional);
            const { xmlFormated, agent, webServiceUrl, action } = await this.gerarConsulta.gerarConsulta(xmlConsulta, this.metodo, ambienteNacional || this.isAmbienteNacional(this.tpEvento), '', this.modelo);
            xmlConsultaSoap = xmlFormated;
            webServiceUrlTmp = webServiceUrl;
            // Efetua requisição para o webservice NFEStatusServico
            const xmlRetorno = await this.axios.post(webServiceUrl, xmlFormated, {
                headers: {
                    'Content-Type': ContentType,
                    'SOAPAction': action,
                },
                httpsAgent: agent
            });
            return xmlRetorno.data;
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
            const fileName = ambienteNacional ? 'RecepcaoEvento[Nacional]-consulta' : 'RecepcaoEvento[Regional]-consulta';
            this.utility.salvaConsulta(xmlConsulta, xmlConsultaSoap, this.metodo, fileName);
        }
    }
    async Exec(data) {
        try {
            const { evento, idLote, modelo } = data;
            const { nacional, regional } = this.separaEventosPorAmbiente(evento);
            if (modelo === '65')
                this.modelo = 'NFCe';
            // Enviar eventos ambiente nacional e regional separadamente
            let responseNacionalInJson, responseRegionalInJson = null;
            let finalResponseInJson = [];
            if (nacional.length > 0) {
                const retornoNacional = await this.enviaEvento(nacional, idLote, 0);
                responseNacionalInJson = this.utility.verificaRejeicao(retornoNacional, this.metodo);
                this.utility.salvaRetorno(retornoNacional, responseNacionalInJson, this.metodo, 'RecepcaoEvento[Nacional]-retorno');
                this.trataRetorno(responseNacionalInJson);
                finalResponseInJson.push(responseNacionalInJson);
            }
            if (regional.length > 0) {
                const retornoRegional = await this.enviaEvento(regional, idLote, 1);
                responseRegionalInJson = this.utility.verificaRejeicao(retornoRegional, this.metodo);
                this.utility.salvaRetorno(retornoRegional, responseRegionalInJson, this.metodo, 'RecepcaoEvento[Regional]-retorno');
                this.trataRetorno(responseRegionalInJson);
                finalResponseInJson.push(responseRegionalInJson);
            }
            return {
                success: true,
                xMotivos: this.xMotivoPorEvento,
                response: finalResponseInJson,
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = NFERecepcaoEventoService;
//# sourceMappingURL=NFERecepcaoEventoService.js.map