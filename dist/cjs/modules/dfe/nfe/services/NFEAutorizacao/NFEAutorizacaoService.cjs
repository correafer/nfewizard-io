"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NFERetornoAutorizacao_js_1 = __importDefault(require("../../operations/NFERetornoAutorizacao/NFERetornoAutorizacao.js"));
const XmlParser_js_1 = __importDefault(require("../../../../../core/utils/XmlParser.js"));
const ValidaCPFCNPJ_js_1 = __importDefault(require("../../../../../core/utils/ValidaCPFCNPJ.js"));
const BaseNFe_js_1 = __importDefault(require("@Modules/dfe/base/BaseNFe.js"));
const date_fns_1 = require("date-fns");
const NFEImposto_js_1 = require("@Utils/NFEImposto.js");
const NFERetornoAutorizacaoService_js_1 = __importDefault(require("../NFERetornoAutorizacao/NFERetornoAutorizacaoService.js"));
class NFEAutorizacaoService extends BaseNFe_js_1.default {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'NFEAutorizacao', axios, saveFiles, gerarConsulta);
        this.xmlNFe = [];
    }
    gerarXml(data) {
        return this.gerarXmlNFeAutorizacao(data);
    }
    salvaArquivos(xmlConsulta, responseInJson, xmlRetorno, options) {
        // Recupera configuração do ambiente para verificar se os arquivos gerados serão gravados em disco
        const config = this.environment.getConfig();
        let dateAndTimeInFileName = config.dfe.incluirTimestampNoNomeDosArquivos;
        const createFileName = (prefix, includeMethodName) => {
            const dtaTime = dateAndTimeInFileName ? `-${(0, date_fns_1.format)(new Date(), 'dd-MM-yyyy-HHmm')}` : '';
            const baseFileName = includeMethodName ? `${this.metodo}` : '';
            const prefixPart = prefix ? includeMethodName ? `-${prefix}` : `${prefix}` : '';
            const nfePart = responseInJson.chNFe ? `-${responseInJson.chNFe}` : '';
            const dateTimePart = dtaTime;
            return `${baseFileName}${prefixPart}${nfePart}${dateTimePart}`;
        };
        const salvarArquivo = (data, prefix, path, fileType, includeMethodName) => {
            const fileName = createFileName(prefix, includeMethodName);
            const method = fileType === 'xml' ? 'salvaXML' : 'salvaJSON';
            this.utility[method]({
                data: data,
                fileName,
                metodo: this.metodo,
                path,
            });
        };
        let chNFe = '';
        let xmlAutorizacaoInJson = {};
        let xMotivoPorXml = [];
        let xmlsInJson = [];
        if (options) {
            const { xmlAutorizacao } = options;
            const json = new XmlParser_js_1.default();
            for (let i = 0; i < xmlAutorizacao.length; i++) {
                xmlAutorizacaoInJson = json.convertXmlToJson(xmlAutorizacao[i], 'NFEAutorizacaoFinal');
                xmlsInJson.push(xmlAutorizacaoInJson);
                const chNFe = xmlAutorizacaoInJson.protNFe.infProt.chNFe;
                const xMotivo = xmlAutorizacaoInJson.protNFe.infProt.xMotivo;
                const cStat = xmlAutorizacaoInJson.protNFe.infProt.cStat;
                xMotivoPorXml.push({
                    chNFe,
                    xMotivo,
                    cStat,
                });
                if (config.dfe.armazenarXMLAutorizacao) {
                    salvarArquivo(xmlAutorizacao[i], chNFe, config.dfe.pathXMLAutorizacao, 'xml', false);
                    salvarArquivo(xmlAutorizacaoInJson, chNFe, config.dfe.pathXMLAutorizacao, 'json', false);
                }
            }
            return {
                success: true,
                xMotivo: xMotivoPorXml,
                response: xmlsInJson,
            };
        }
        return {
            success: true,
            xMotivo: xMotivoPorXml,
            response: xmlsInJson,
        };
    }
    async trataRetorno(xmlRetorno, indSinc, responseInJson) {
        try {
            /**
             * Captura o valor nRec e protNFe
             */
            const { nRec, protNFe } = this.utility.getProtNFe(xmlRetorno);
            /**
             * 0 - assíncrona
             * 1 - síncrona
             */
            let tipoEmissao = 0;
            if (indSinc === 1 && protNFe) {
                tipoEmissao = 1;
            }
            const nfeRetornoAutService = new NFERetornoAutorizacaoService_js_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeRetornoAut = new NFERetornoAutorizacao_js_1.default(nfeRetornoAutService);
            /**
             * Aguarda o Tempo médio de resposta do serviço (em segundos) dos últimos 5 minutos
             * A informação do tMed só é recebida caso o processamento for assíncrono (indSinc = 0)
             */
            if (tipoEmissao !== 1)
                await new Promise(resolve => setTimeout(resolve, Number(responseInJson.infRec.tMed) * 1000));
            const retorno = await nfeRetornoAut.getXmlRetorno({
                tipoEmissao,
                nRec,
                protNFe,
                xmlNFe: this.xmlNFe
            });
            return retorno;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Método utilitário para criação do XML a partir de um Objeto
     */
    anoMesEmissao(dhEmi) {
        // Lógica para obter o ano e mês de emissão (AAMM)
        const dataAtual = new Date(dhEmi);
        const ano = dataAtual.getFullYear().toString().slice(-2);
        const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
        return ano + mes;
    }
    gerarCodigoNumerico() {
        // Lógica para gerar um código numérico aleatório de 8 dígitos
        return Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    }
    calcularModulo11(sequencia) {
        const pesos = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let somatoria = 0;
        for (let i = 0; i < sequencia.length; i++) {
            somatoria += parseInt(sequencia.charAt(i)) * pesos[i];
        }
        const restoDivisao = somatoria % 11;
        const digitoVerificador = restoDivisao === 0 || restoDivisao === 1 ? 0 : 11 - restoDivisao;
        return digitoVerificador;
    }
    calcularDigitoVerificador(data) {
        const { infNFe: { ide: { cUF, mod, serie, nNF, tpEmis, cNF, dhEmi }, emit: { CNPJCPF } } } = data;
        const anoMes = this.anoMesEmissao(dhEmi);
        // Montando a sequência para o cálculo do dígito verificador
        const sequencia = `${cUF}${anoMes}${CNPJCPF}${mod}${String(serie).padStart(3, '0')}${String(nNF).padStart(9, '0')}${tpEmis}${cNF}`;
        // Calculando o dígito verificador
        const dv = this.calcularModulo11(sequencia);
        // Montando a chave de acesso
        const chaveAcesso = `NFe${sequencia}` + dv;
        this.chaveNfe = `${sequencia}${dv}`;
        return {
            chaveAcesso,
            dv
        };
    }
    validaDocumento(doc, campo) {
        // Valida se CPF ou CNPJ
        const nfeAutorizacaoHandler = new ValidaCPFCNPJ_js_1.default();
        const { documentoValido, tipoDoDocumento } = nfeAutorizacaoHandler.validarCpfCnpj(doc);
        if (!documentoValido || tipoDoDocumento === 'Desconhecido') {
            const message = tipoDoDocumento === 'Desconhecido'
                ? `Documento do ${campo} ausente ou inválido`
                : `${tipoDoDocumento} do ${campo} é inválido`;
            throw new Error(message);
        }
        return tipoDoDocumento;
    }
    gerarXmlNFeAutorizacao(data) {
        const createXML = (NFe) => {
            // Verificando se existe mais de um produto
            if (NFe?.infNFe?.det instanceof Array) {
                // Adicionando indice ao item
                const formatedItens = NFe.infNFe.det.map((det, index) => {
                    if (det.imposto.ICMS.dadosICMS) {
                        const icms = (0, NFEImposto_js_1.mountICMS)(det.imposto.ICMS.dadosICMS);
                        det.imposto.ICMS = icms;
                    }
                    if (det.imposto.PIS.dadosPIS) {
                        const pis = (0, NFEImposto_js_1.mountPIS)(det.imposto.PIS.dadosPIS);
                        det.imposto.PIS = pis;
                    }
                    if (det.imposto.COFINS.dadosCOFINS) {
                        const cofins = (0, NFEImposto_js_1.mountCOFINS)(det.imposto.COFINS.dadosCOFINS);
                        det.imposto.COFINS = cofins;
                    }
                    return {
                        $: {
                            nItem: index + 1,
                        },
                        ...det,
                    };
                });
                NFe.infNFe.det = formatedItens;
            }
            // Cria chave da nota e grava digito verificador
            const { chaveAcesso, dv } = this.calcularDigitoVerificador(NFe);
            NFe.infNFe.ide.cDV = dv;
            NFe.infNFe.ide.verProc = NFe.infNFe.ide.verProc || '1.0.0.0';
            // Valida Documento do emitente
            NFe.infNFe.emit = Object.assign({ [this.validaDocumento(String(NFe.infNFe.emit.CNPJCPF), 'emitente')]: NFe.infNFe.emit.CNPJCPF }, NFe.infNFe.emit);
            delete NFe.infNFe.emit.CNPJCPF;
            // Valida Documento do destinatário
            if (NFe.infNFe.dest) {
                NFe.infNFe.dest = Object.assign({ [this.validaDocumento(String(NFe.infNFe.dest?.CNPJCPF || ''), 'destinatário')]: NFe.infNFe.dest?.CNPJCPF || '' }, NFe.infNFe.dest);
                delete NFe.infNFe.dest.CNPJCPF;
            }
            // Valida Documento do transportador
            if (NFe.infNFe.transp.transporta) {
                NFe.infNFe.transp.transporta = Object.assign({ [this.validaDocumento(String(NFe.infNFe.transp.transporta?.CNPJCPF), 'transportador')]: NFe.infNFe.transp.transporta?.CNPJCPF }, NFe.infNFe.transp.transporta);
                delete NFe.infNFe.transp.transporta?.CNPJCPF;
            }
            // Valida Documento do produtor rural
            if (NFe.infNFe?.NFref instanceof Array) {
                const NFrefArray = NFe.infNFe.NFref;
                if (NFrefArray && NFrefArray.length > 0) {
                    NFe.infNFe.NFref = NFrefArray.map(NFref => {
                        if (NFref.refNFP) {
                            NFref.refNFP = Object.assign({ [this.validaDocumento(String(NFref.refNFP.CNPJCPF), 'produtor rural')]: NFref.refNFP.CNPJCPF }, NFref.refNFP);
                            delete NFref.refNFP.CNPJCPF;
                        }
                        return NFref;
                    });
                }
            }
            else {
                if (NFe.infNFe.NFref && NFe.infNFe.NFref.refNFP) {
                    NFe.infNFe.NFref.refNFP = Object.assign({ [this.validaDocumento(String(NFe.infNFe.NFref.refNFP.CNPJCPF), 'produtor rural')]: NFe.infNFe.NFref.refNFP.CNPJCPF }, NFe.infNFe.NFref.refNFP);
                }
            }
            // Caso Seja hambiente de homologação
            if (NFe.infNFe.dest) {
                if (NFe.infNFe.ide.tpAmb === 2) {
                    NFe.infNFe.dest.xNome = 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
                }
            }
            const xmlObject = {
                $: {
                    xmlns: 'http://www.portalfiscal.inf.br/nfe'
                },
                infNFe: {
                    $: {
                        versao: "4.00",
                        Id: chaveAcesso,
                    },
                    ...NFe.infNFe
                }
            };
            const eventoXML = this.xmlBuilder.gerarXml(xmlObject, 'NFe');
            const xmlAssinado = this.xmlBuilder.assinarXML(eventoXML, 'infNFe');
            this.xmlNFe.push(xmlAssinado);
        };
        if (data.NFe instanceof Array) {
            for (let i = 0; i < data.NFe.length; i++) {
                const NFe = data.NFe[i];
                createXML(NFe);
            }
        }
        else {
            createXML(data.NFe);
        }
        // Base do XML
        const baseXML = {
            $: {
                versao: "4.00",
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            idLote: data.idLote,
            indSinc: data.indSinc,
            _: '[XML]'
        };
        // Gera base do XML
        const xml = this.xmlBuilder.gerarXml(baseXML, 'enviNFe');
        return xml.replace('[XML]', this.xmlNFe.join(''));
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
            xmlConsulta = this.gerarXmlNFeAutorizacao(data);
            const { xmlFormated, agent, webServiceUrl, action } = await this.gerarConsulta.gerarConsulta(xmlConsulta, this.metodo);
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
            /**
             * Verifica se houve rejeição no processamento do lote
             */
            responseInJson = this.utility.verificaRejeicao(xmlRetorno.data, this.metodo);
            const retorno = await this.trataRetorno(xmlRetorno.data, data.indSinc, responseInJson);
            const xmlFinal = this.salvaArquivos(xmlConsulta, responseInJson, xmlRetorno.data, {
                xmlAutorizacao: retorno.data,
                xMotivo: retorno.message
            });
            return {
                success: true,
                xMotivo: xmlFinal.xMotivo,
                xmls: xmlFinal.response,
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
exports.default = NFEAutorizacaoService;
//# sourceMappingURL=NFEAutorizacaoService.js.map