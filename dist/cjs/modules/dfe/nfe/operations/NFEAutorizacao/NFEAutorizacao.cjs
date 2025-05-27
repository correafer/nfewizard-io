"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEAutorizacao {
    constructor(nfeAutorizacaoService) {
        this.nfeAutorizacaoService = nfeAutorizacaoService;
    }
    async Exec(data) {
        return await this.nfeAutorizacaoService.Exec(data);
    }
}
exports.default = NFEAutorizacao;
//# sourceMappingURL=NFEAutorizacao.js.map