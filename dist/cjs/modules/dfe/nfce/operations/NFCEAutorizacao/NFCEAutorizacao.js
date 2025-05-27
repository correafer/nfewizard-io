class NFCEAutorizacao {
    constructor(nfceAutorizacaoService) {
        this.nfceAutorizacaoService = nfceAutorizacaoService;
    }
    async Exec(data) {
        return await this.nfceAutorizacaoService.Exec(data);
    }
}
export default NFCEAutorizacao;
//# sourceMappingURL=NFCEAutorizacao.js.map