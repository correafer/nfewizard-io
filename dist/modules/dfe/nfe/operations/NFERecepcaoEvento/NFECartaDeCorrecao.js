class NFECartaDeCorrecao {
    nfeCartaDeCorrecaoServiceService;
    constructor(nfeCartaDeCorrecaoServiceService) {
        this.nfeCartaDeCorrecaoServiceService = nfeCartaDeCorrecaoServiceService;
    }
    async Exec(data) {
        return await this.nfeCartaDeCorrecaoServiceService.Exec(data);
    }
}
export default NFECartaDeCorrecao;
//# sourceMappingURL=NFECartaDeCorrecao.js.map