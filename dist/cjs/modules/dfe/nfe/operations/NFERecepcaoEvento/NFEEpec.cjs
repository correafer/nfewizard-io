"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEEpec {
    constructor(nfeEpecServiceService) {
        this.nfeEpecServiceService = nfeEpecServiceService;
    }
    async Exec(data) {
        return await this.nfeEpecServiceService.Exec(data);
    }
}
exports.default = NFEEpec;
//# sourceMappingURL=NFEEpec.js.map