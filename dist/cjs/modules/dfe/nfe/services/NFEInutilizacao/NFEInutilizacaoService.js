import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
class NFEInutilizacaoService extends BaseNFE {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'NFEInutilizacao', axios, saveFiles, gerarConsulta);
    }
    gerarXml(chave) {
        return this.gerarXmlNFeInutilizacao(chave);
    }
    /**
     * Método para criação do ID de Inutilização
     */
    criarId(codigoUF, ano, cnpj, modelo, serie, numeroInicial, numeroFinal) {
        const id = `ID${codigoUF}${ano}${cnpj}${modelo}${serie}${numeroInicial}${numeroFinal}`;
        return id;
    }
    /**
     * Método utilitário para criação do XML a partir de um Objeto
     */
    gerarXmlNFeInutilizacao(data) {
        const { nfe: { ambiente } } = this.environment.getConfig();
        const { cUF, ano, CNPJ, mod, serie, nNFIni, nNFFin, xJust } = data;
        const anoFormatado = ano.toString().slice(-2);
        const serieFormatada = serie.padStart(3, '0');
        const numNFIniFormatado = nNFIni.padStart(9, '0');
        const numNFFinFormatado = nNFFin.padStart(9, '0');
        const id = this.criarId(cUF, anoFormatado, CNPJ, mod, serieFormatada, numNFIniFormatado, numNFFinFormatado);
        const xServ = 'INUTILIZAR';
        if ([55, 65].indexOf(Number(mod)) === -1) {
            throw new Error(`Modelo do documento para inutilização deve ser 55 ou 65. Modelo informado: ${mod}`);
        }
        const xmlObject = {
            $: {
                versao: "4.00",
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            infInut: {
                $: {
                    Id: `${id}`,
                },
                tpAmb: ambiente,
                xServ,
                cUF,
                ano,
                CNPJ,
                mod,
                serie,
                nNFIni,
                nNFFin,
                xJust,
            }
        };
        // Gerar XML
        const xml = this.xmlBuilder.gerarXml(xmlObject, 'inutNFe');
        // Assinar XML
        return this.xmlBuilder.assinarXML(xml, 'infInut');
    }
}
export default NFEInutilizacaoService;
//# sourceMappingURL=NFEInutilizacaoService.js.map