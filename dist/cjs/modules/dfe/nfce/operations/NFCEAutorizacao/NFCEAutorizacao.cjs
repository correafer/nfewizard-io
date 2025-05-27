"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFCEAutorizacao {
    constructor(nfceAutorizacaoService) {
        this.nfceAutorizacaoService = nfceAutorizacaoService;
    }
    async Exec(data) {
        return await this.nfceAutorizacaoService.Exec(data);
    }
}
exports.default = NFCEAutorizacao;
//# sourceMappingURL=NFCEAutorizacao.js.map