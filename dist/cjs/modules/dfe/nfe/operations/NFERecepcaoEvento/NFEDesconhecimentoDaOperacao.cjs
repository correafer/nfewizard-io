"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEDesconhecimentoDaOperacao {
    constructor(nfeDesconhecimentoDaOperacaoServiceService) {
        this.nfeDesconhecimentoDaOperacaoServiceService = nfeDesconhecimentoDaOperacaoServiceService;
    }
    async Exec(data) {
        return await this.nfeDesconhecimentoDaOperacaoServiceService.Exec(data);
    }
}
exports.default = NFEDesconhecimentoDaOperacao;
//# sourceMappingURL=NFEDesconhecimentoDaOperacao.js.map