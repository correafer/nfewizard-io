"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFECancelamento {
    constructor(nfeCancelamentoServiceService) {
        this.nfeCancelamentoServiceService = nfeCancelamentoServiceService;
    }
    async Exec(data) {
        return await this.nfeCancelamentoServiceService.Exec(data);
    }
}
exports.default = NFECancelamento;
//# sourceMappingURL=NFECancelamento.js.map