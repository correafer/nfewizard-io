import BaseNFE from '../../../../dfe/base/BaseNFe.js';
class NFEconsultaProtocoloService extends BaseNFE {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'NFEConsultaProtocolo', axios, saveFiles, gerarConsulta);
    }
    gerarXml(chave) {
        try {
            const { nfe: { ambiente, versaoDF } } = this.environment.getConfig();
            const xmlObject = {
                $: {
                    versao: versaoDF,
                    xmlns: 'http://www.portalfiscal.inf.br/nfe'
                },
                tpAmb: ambiente,
                xServ: 'CONSULTAR',
                chNFe: chave,
            };
            return this.xmlBuilder.gerarXml(xmlObject, 'consSitNFe');
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
export default NFEconsultaProtocoloService;
//# sourceMappingURL=NFEconsultaProtocoloService.js.map