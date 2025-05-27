class NFEDistribuicaoDFePorChave {
    nfeDistribuicaoDFePorChaveService;
    constructor(nfeDistribuicaoDFePorChaveService) {
        this.nfeDistribuicaoDFePorChaveService = nfeDistribuicaoDFePorChaveService;
    }
    async Exec(data) {
        return await this.nfeDistribuicaoDFePorChaveService.Exec(data);
    }
}
export default NFEDistribuicaoDFePorChave;
//# sourceMappingURL=NFEDistribuicaoDFePorChave.js.map