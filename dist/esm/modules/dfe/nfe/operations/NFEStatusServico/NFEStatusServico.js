class NFEStatusServico {
    constructor(nfeStatusServicoService) {
        this.nfeStatusServicoService = nfeStatusServicoService;
    }
    async Exec(data) {
        return await this.nfeStatusServicoService.Exec(data);
    }
}
export default NFEStatusServico;
//# sourceMappingURL=NFEStatusServico.js.map