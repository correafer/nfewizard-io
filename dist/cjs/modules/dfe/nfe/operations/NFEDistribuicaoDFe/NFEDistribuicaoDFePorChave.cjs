"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEDistribuicaoDFePorChave {
    constructor(nfeDistribuicaoDFePorChaveService) {
        this.nfeDistribuicaoDFePorChaveService = nfeDistribuicaoDFePorChaveService;
    }
    async Exec(data) {
        return await this.nfeDistribuicaoDFePorChaveService.Exec(data);
    }
}
exports.default = NFEDistribuicaoDFePorChave;
//# sourceMappingURL=NFEDistribuicaoDFePorChave.js.map