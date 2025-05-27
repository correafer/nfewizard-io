"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFCERetornoAutorizacao {
    constructor(nfceAutorizacaoRetornoService) {
        this.nfceAutorizacaoRetornoService = nfceAutorizacaoRetornoService;
    }
    async getXmlRetorno(data) {
        return await this.nfceAutorizacaoRetornoService.getXmlRetorno(data);
    }
}
exports.default = NFCERetornoAutorizacao;
//# sourceMappingURL=NFCERetornoAutorizacao.js.map