"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFECartaDeCorrecao {
    constructor(nfeCartaDeCorrecaoServiceService) {
        this.nfeCartaDeCorrecaoServiceService = nfeCartaDeCorrecaoServiceService;
    }
    async Exec(data) {
        return await this.nfeCartaDeCorrecaoServiceService.Exec(data);
    }
}
exports.default = NFECartaDeCorrecao;
//# sourceMappingURL=NFECartaDeCorrecao.js.map