class NFEAutorizacao {
    constructor(nfeAutorizacaoService) {
        this.nfeAutorizacaoService = nfeAutorizacaoService;
    }
    async Exec(data) {
        return await this.nfeAutorizacaoService.Exec(data);
    }
}
export default NFEAutorizacao;
//# sourceMappingURL=NFEAutorizacao.js.map