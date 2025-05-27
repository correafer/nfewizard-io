"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEConfirmacaoDaOperacao {
    constructor(nfeConfirmacaoDaOperacaoServiceService) {
        this.nfeConfirmacaoDaOperacaoServiceService = nfeConfirmacaoDaOperacaoServiceService;
    }
    async Exec(data) {
        return await this.nfeConfirmacaoDaOperacaoServiceService.Exec(data);
    }
}
exports.default = NFEConfirmacaoDaOperacao;
//# sourceMappingURL=NFEConfirmacaoDaOperacao.js.map