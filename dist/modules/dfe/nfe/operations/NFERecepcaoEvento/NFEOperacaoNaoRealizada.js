class NFEOperacaoNaoRealizada {
    nfeOperacaoNaoRealizadaServiceService;
    constructor(nfeOperacaoNaoRealizadaServiceService) {
        this.nfeOperacaoNaoRealizadaServiceService = nfeOperacaoNaoRealizadaServiceService;
    }
    async Exec(data) {
        return await this.nfeOperacaoNaoRealizadaServiceService.Exec(data);
    }
}
export default NFEOperacaoNaoRealizada;
//# sourceMappingURL=NFEOperacaoNaoRealizada.js.map