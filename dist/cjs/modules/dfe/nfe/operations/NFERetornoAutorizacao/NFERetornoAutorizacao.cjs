"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFERetornoAutorizacao {
    constructor(nfeRetornoAutorizacaoService) {
        this.nfeRetornoAutorizacaoService = nfeRetornoAutorizacaoService;
    }
    async getXmlRetorno(data) {
        return await this.nfeRetornoAutorizacaoService.getXmlRetorno(data);
    }
}
exports.default = NFERetornoAutorizacao;
//# sourceMappingURL=NFERetornoAutorizacao.js.map