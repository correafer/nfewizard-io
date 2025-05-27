import XmlParser from '../../../../../core/utils/XmlParser.js';
import ValidaCPFCNPJ from '../../../../../core/utils/ValidaCPFCNPJ.js';
import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
import { format } from 'date-fns';
import { generateQRCodeURLOffline, generateQRCodeURLOnline } from './util/NFCEQRCode.js';
import xml2js, { Builder } from 'xml2js';
import { mountCOFINS, mountICMS, mountPIS } from '@Utils/NFEImposto.js';
import NFCERetornoAutorizacaoService from '../NFCERetornoAutorizacao/NFCERetornoAutorizacaoService.js';
import NFCERetornoAutorizacao from '../../operations/NFCERetornoAutorizacao/NFCERetornoAutorizacao.js';
class NFCEAutorizacaoService extends BaseNFE {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'NFEAutorizacao', axios, saveFiles, gerarConsulta);
        this.xmlNFe = [];
    }
    gerarXml(data) {
        return this.gerarXmlNFCEAutorizacao(data);
    }
    salvaArquivos(xmlConsulta, responseInJson, xmlRetorno, options) {
        // Recupera configuração do ambiente para verificar se os arquivos gerados serão gravados em disco
        const config = this.environment.getConfig();
        let dateAndTimeInFileName = config.dfe.incluirTimestampNoNomeDosArquivos;
        const createFileName = (prefix, includeMethodName) => {
            const dtaTime = dateAndTimeInFileName ? `-${format(new Date(), 'dd-MM-yyyy-HHmm')}` : '';
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
            const json = new XmlParser();
            for (let i = 0; i < xmlAutorizacao.length; i++) {
                xmlAutorizacaoInJson = json.convertXmlToJson(xmlAutorizacao[i], 'NFCEAutorizacaoFinal');
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
            const nfeRetornoAutService = new NFCERetornoAutorizacaoService(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeRetornoAut = new NFCERetornoAutorizacao(nfeRetornoAutService);
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
    diaEmissao(dhEmi) {
        // Converte a string para uma data
        const dataAtual = new Date(dhEmi);
        // Extrai o dia com dois dígitos
        const dia = dataAtual.getDate().toString().padStart(2, '0');
        // Retorna o dia
        return dia;
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
        const nfeAutorizacaoHandler = new ValidaCPFCNPJ();
        const { documentoValido, tipoDoDocumento } = nfeAutorizacaoHandler.validarCpfCnpj(doc);
        if (!documentoValido || tipoDoDocumento === 'Desconhecido') {
            const message = tipoDoDocumento === 'Desconhecido'
                ? `Documento do ${campo} ausente ou inválido`
                : `${tipoDoDocumento} do ${campo} é inválido`;
            throw new Error(message);
        }
        return tipoDoDocumento;
    }
    extrairDigestValue(xmlAssinado) {
        const match = xmlAssinado.match(/<DigestValue>([^<]+)<\/DigestValue>/);
        if (match && match[1]) {
            return match[1];
        }
        throw new Error('DigestValue não encontrado no XML assinado.');
    }
    gerarXmlNFCEAutorizacao(data) {
        const createXML = (NFe) => {
            // Verificando se existe mais de um produto
            if (NFe?.infNFe?.det instanceof Array) {
                // Adicionando indice ao item
                const formatedItens = NFe.infNFe.det.map((det, index) => {
                    if (det.imposto.ICMS.dadosICMS) {
                        const icms = mountICMS(det.imposto.ICMS.dadosICMS);
                        det.imposto.ICMS = icms;
                    }
                    if (det.imposto.PIS.dadosPIS) {
                        const pis = mountPIS(det.imposto.PIS.dadosPIS);
                        det.imposto.PIS = pis;
                    }
                    if (det.imposto.COFINS.dadosCOFINS) {
                        const cofins = mountCOFINS(det.imposto.COFINS.dadosCOFINS);
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
            const { nfe: { idCSC, tokenCSC } } = this.environment.getConfig();
            let qrCode = '';
            if (![4, 9].includes(NFe.infNFe.ide.tpEmis)) {
                qrCode = generateQRCodeURLOnline(chaveAcesso, '2', NFe.infNFe.ide.tpAmb, Number(idCSC), String(tokenCSC), this.utility);
            }
            const urlConsultaNFCe = this.utility.getUrlNFCe('URL-ConsultaNFCe', false, '');
            const nfeWithQrCode = {
                ...NFe,
                infNFeSupl: {
                    qrCode: qrCode,
                    urlChave: urlConsultaNFCe,
                }
            };
            NFe = nfeWithQrCode;
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
                },
                infNFeSupl: {
                    ...NFe.infNFeSupl
                }
            };
            const eventoXML = this.xmlBuilder.gerarXml(xmlObject, 'NFe');
            let xmlAssinado = this.xmlBuilder.assinarXML(eventoXML, 'infNFe');
            if ([4, 9].includes(NFe.infNFe.ide.tpEmis)) {
                // capturar digestValue
                const digestValue = this.extrairDigestValue(xmlAssinado);
                // substituir tag qrcode
                const tpAmb = NFe.infNFe.ide.tpAmb;
                const valNF = NFe.infNFe.total.ICMSTot.vNF;
                const diaEmissao = this.diaEmissao(NFe.infNFe.ide.dhEmi);
                qrCode = generateQRCodeURLOffline(chaveAcesso, '2', tpAmb, diaEmissao, valNF, digestValue, Number(idCSC), String(tokenCSC), this.utility);
                xml2js.parseString(xmlAssinado, (err, result) => {
                    if (err) {
                        throw new Error('Erro ao parsear o XML para atualização do qrCode:');
                    }
                    else {
                        if (result.NFe?.infNFeSupl[0]?.qrCode) {
                            result.NFe.infNFeSupl[0].qrCode[0] = qrCode;
                            const builder = new Builder({
                                headless: true, renderOpts: {
                                    pretty: false
                                },
                            });
                            xmlAssinado = builder.buildObject(result);
                        }
                        else {
                            throw new Error('Tag qrCode não encontrada no XML.');
                        }
                    }
                });
            }
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
    // protected setContentType() {
    //     const UF = this.environment.config.dfe.UF;
    //     const ufsAppSoad = ['MG', 'GO', 'MT', 'MS', 'AM'];
    //     if (ufsAppSoad.includes(UF)) {
    //         return 'application/soap+xml'
    //     }
    //     return 'text/xml; charset=utf-8'
    // }
    async Exec(data) {
        let xmlConsulta = '';
        let xmlConsultaSoap = '';
        let webServiceUrlTmp = '';
        let responseInJson = undefined;
        let xmlRetorno = {};
        const ContentType = this.setContentType();
        try {
            // Gerando XML para consulta de Status do Serviço
            xmlConsulta = this.gerarXmlNFCEAutorizacao(data);
            const { xmlFormated, agent, webServiceUrl, action } = await this.gerarConsulta.gerarConsulta(xmlConsulta, this.metodo, false, '', 'NFCe');
            xmlConsultaSoap = xmlFormated;
            webServiceUrlTmp = webServiceUrl;
            // Efetua requisição para o webservice NFEStatusServico
            const xmlRetorno = await this.axios.post(webServiceUrl, xmlFormated, {
                headers: {
                    'Content-Type': ContentType,
                    'SOAPAction': action,
                    'CSC': '9cf44de0-502d-4351-bf18-0843e6528e22',
                },
                httpsAgent: agent
            });
            /**
             * Verifica se houve rejeição no processamento do lote
             */
            const responseInJson = this.utility.verificaRejeicao(xmlRetorno.data, this.metodo);
            const retorno = await this.trataRetorno(xmlRetorno.data, data.indSinc, responseInJson);
            const xmlFinal = this.salvaArquivos(xmlConsulta, responseInJson, xmlRetorno.data, {
                xmlAutorizacao: retorno.data,
                xMotivo: retorno.message
            });
            xmlFinal.xMotivo = xmlFinal.xMotivo.map((item) => ({
                ...item,
                xMotivo: item.xMotivo.replace('NF-e', 'NFC-e')
            }));
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
export default NFCEAutorizacaoService;
//# sourceMappingURL=NFCEAutorizacaoService.js.map