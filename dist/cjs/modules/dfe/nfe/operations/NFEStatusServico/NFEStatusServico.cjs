"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEStatusServico {
    constructor(nfeStatusServicoService) {
        this.nfeStatusServicoService = nfeStatusServicoService;
    }
    async Exec(data) {
        return await this.nfeStatusServicoService.Exec(data);
    }
}
exports.default = NFEStatusServico;
//# sourceMappingURL=NFEStatusServico.js.map