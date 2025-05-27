class NFERecepcaoEvento {
    nfeRecepcaoEventoService;
    constructor(nfeRecepcaoEventoService) {
        this.nfeRecepcaoEventoService = nfeRecepcaoEventoService;
    }
    async Exec(data) {
        return await this.nfeRecepcaoEventoService.Exec(data);
    }
}
export default NFERecepcaoEvento;
//# sourceMappingURL=NFERecepcaoEvento.js.map