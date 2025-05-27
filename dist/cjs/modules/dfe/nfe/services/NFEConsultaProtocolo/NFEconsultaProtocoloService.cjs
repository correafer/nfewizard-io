"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseNFe_js_1 = __importDefault(require("../../../../dfe/base/BaseNFe.js"));
class NFEconsultaProtocoloService extends BaseNFe_js_1.default {
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
exports.default = NFEconsultaProtocoloService;
//# sourceMappingURL=NFEconsultaProtocoloService.js.map