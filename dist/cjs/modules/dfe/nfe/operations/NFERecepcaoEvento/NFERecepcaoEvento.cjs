"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFERecepcaoEvento {
    constructor(nfeRecepcaoEventoService) {
        this.nfeRecepcaoEventoService = nfeRecepcaoEventoService;
    }
    async Exec(data) {
        return await this.nfeRecepcaoEventoService.Exec(data);
    }
}
exports.default = NFERecepcaoEvento;
//# sourceMappingURL=NFERecepcaoEvento.js.map