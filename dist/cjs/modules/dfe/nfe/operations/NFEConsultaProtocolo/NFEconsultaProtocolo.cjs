"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NFEConsultaProtocolo {
    constructor(nfeConsultaProtocoloService) {
        this.nfeConsultaProtocoloService = nfeConsultaProtocoloService;
    }
    async Exec(data) {
        return await this.nfeConsultaProtocoloService.Exec(data);
    }
}
exports.default = NFEConsultaProtocolo;
//# sourceMappingURL=NFEconsultaProtocolo.js.map