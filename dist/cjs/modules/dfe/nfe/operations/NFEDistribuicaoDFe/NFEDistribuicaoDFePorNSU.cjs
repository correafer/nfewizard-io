"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEDistribuicaoDFePorNSU {
    constructor(nfeDistribuicaoDFePorNSUService) {
        this.nfeDistribuicaoDFePorNSUService = nfeDistribuicaoDFePorNSUService;
    }
    async Exec(data) {
        return await this.nfeDistribuicaoDFePorNSUService.Exec(data);
    }
}
exports.default = NFEDistribuicaoDFePorNSU;
//# sourceMappingURL=NFEDistribuicaoDFePorNSU.js.map