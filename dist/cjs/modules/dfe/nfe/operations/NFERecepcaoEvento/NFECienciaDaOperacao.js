class NFECienciaDaOperacao {
    constructor(nfeCienciaDaOperacaoServiceService) {
        this.nfeCienciaDaOperacaoServiceService = nfeCienciaDaOperacaoServiceService;
    }
    async Exec(data) {
        return await this.nfeCienciaDaOperacaoServiceService.Exec(data);
    }
}
export default NFECienciaDaOperacao;
//# sourceMappingURL=NFECienciaDaOperacao.js.map