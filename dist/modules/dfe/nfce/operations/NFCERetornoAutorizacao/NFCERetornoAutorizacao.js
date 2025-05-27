class NFCERetornoAutorizacao {
    nfceAutorizacaoRetornoService;
    constructor(nfceAutorizacaoRetornoService) {
        this.nfceAutorizacaoRetornoService = nfceAutorizacaoRetornoService;
    }
    async getXmlRetorno(data) {
        return await this.nfceAutorizacaoRetornoService.getXmlRetorno(data);
    }
}
export default NFCERetornoAutorizacao;
//# sourceMappingURL=NFCERetornoAutorizacao.js.map