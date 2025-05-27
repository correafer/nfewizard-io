"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEOperacaoNaoRealizada {
    constructor(nfeOperacaoNaoRealizadaServiceService) {
        this.nfeOperacaoNaoRealizadaServiceService = nfeOperacaoNaoRealizadaServiceService;
    }
    async Exec(data) {
        return await this.nfeOperacaoNaoRealizadaServiceService.Exec(data);
    }
}
exports.default = NFEOperacaoNaoRealizada;
//# sourceMappingURL=NFEOperacaoNaoRealizada.js.map