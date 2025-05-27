"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEInutilizacao {
    constructor(nfeInutilizacaoService) {
        this.nfeInutilizacaoService = nfeInutilizacaoService;
    }
    async Exec(data) {
        return await this.nfeInutilizacaoService.Exec(data);
    }
}
exports.default = NFEInutilizacao;
//# sourceMappingURL=NFEInutilizacao.js.map