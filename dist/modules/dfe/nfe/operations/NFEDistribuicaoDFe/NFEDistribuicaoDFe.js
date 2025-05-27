class NFERecepcaoEvento {
    nfeDistribuicaoDFeService;
    constructor(nfeDistribuicaoDFeService) {
        this.nfeDistribuicaoDFeService = nfeDistribuicaoDFeService;
    }
    async Exec(data) {
        return await this.nfeDistribuicaoDFeService.Exec(data);
    }
}
export default NFERecepcaoEvento;
//# sourceMappingURL=NFEDistribuicaoDFe.js.map