class NFEDesconhecimentoDaOperacao {
    constructor(nfeDesconhecimentoDaOperacaoServiceService) {
        this.nfeDesconhecimentoDaOperacaoServiceService = nfeDesconhecimentoDaOperacaoServiceService;
    }
    async Exec(data) {
        return await this.nfeDesconhecimentoDaOperacaoServiceService.Exec(data);
    }
}
export default NFEDesconhecimentoDaOperacao;
//# sourceMappingURL=NFEDesconhecimentoDaOperacao.js.map