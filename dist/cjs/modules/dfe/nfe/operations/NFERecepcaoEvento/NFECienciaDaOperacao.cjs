"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFECienciaDaOperacao {
    constructor(nfeCienciaDaOperacaoServiceService) {
        this.nfeCienciaDaOperacaoServiceService = nfeCienciaDaOperacaoServiceService;
    }
    async Exec(data) {
        return await this.nfeCienciaDaOperacaoServiceService.Exec(data);
    }
}
exports.default = NFECienciaDaOperacao;
//# sourceMappingURL=NFECienciaDaOperacao.js.map