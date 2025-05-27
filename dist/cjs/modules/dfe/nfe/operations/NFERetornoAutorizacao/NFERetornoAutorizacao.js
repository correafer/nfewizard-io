class NFERetornoAutorizacao {
    constructor(nfeRetornoAutorizacaoService) {
        this.nfeRetornoAutorizacaoService = nfeRetornoAutorizacaoService;
    }
    async getXmlRetorno(data) {
        return await this.nfeRetornoAutorizacaoService.getXmlRetorno(data);
    }
}
export default NFERetornoAutorizacao;
//# sourceMappingURL=NFERetornoAutorizacao.js.map