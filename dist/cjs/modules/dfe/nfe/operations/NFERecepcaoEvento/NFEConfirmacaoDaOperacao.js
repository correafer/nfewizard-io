class NFEConfirmacaoDaOperacao {
    constructor(nfeConfirmacaoDaOperacaoServiceService) {
        this.nfeConfirmacaoDaOperacaoServiceService = nfeConfirmacaoDaOperacaoServiceService;
    }
    async Exec(data) {
        return await this.nfeConfirmacaoDaOperacaoServiceService.Exec(data);
    }
}
export default NFEConfirmacaoDaOperacao;
//# sourceMappingURL=NFEConfirmacaoDaOperacao.js.map