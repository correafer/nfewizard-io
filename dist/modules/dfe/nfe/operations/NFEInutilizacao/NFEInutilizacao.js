class NFEInutilizacao {
    nfeInutilizacaoService;
    constructor(nfeInutilizacaoService) {
        this.nfeInutilizacaoService = nfeInutilizacaoService;
    }
    async Exec(data) {
        return await this.nfeInutilizacaoService.Exec(data);
    }
}
export default NFEInutilizacao;
//# sourceMappingURL=NFEInutilizacao.js.map