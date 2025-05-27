class NFEConsultaProtocolo {
    nfeConsultaProtocoloService;
    constructor(nfeConsultaProtocoloService) {
        this.nfeConsultaProtocoloService = nfeConsultaProtocoloService;
    }
    async Exec(data) {
        return await this.nfeConsultaProtocoloService.Exec(data);
    }
}
export default NFEConsultaProtocolo;
//# sourceMappingURL=NFEconsultaProtocolo.js.map