"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFERecepcaoEvento {
    constructor(nfeDistribuicaoDFeService) {
        this.nfeDistribuicaoDFeService = nfeDistribuicaoDFeService;
    }
    async Exec(data) {
        return await this.nfeDistribuicaoDFeService.Exec(data);
    }
}
exports.default = NFERecepcaoEvento;
//# sourceMappingURL=NFEDistribuicaoDFe.js.map