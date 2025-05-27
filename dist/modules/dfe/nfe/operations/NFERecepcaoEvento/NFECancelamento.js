class NFECancelamento {
    nfeCancelamentoServiceService;
    constructor(nfeCancelamentoServiceService) {
        this.nfeCancelamentoServiceService = nfeCancelamentoServiceService;
    }
    async Exec(data) {
        return await this.nfeCancelamentoServiceService.Exec(data);
    }
}
export default NFECancelamento;
//# sourceMappingURL=NFECancelamento.js.map