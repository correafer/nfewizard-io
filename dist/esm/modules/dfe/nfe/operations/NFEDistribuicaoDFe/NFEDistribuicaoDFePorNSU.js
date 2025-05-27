class NFEDistribuicaoDFePorNSU {
    constructor(nfeDistribuicaoDFePorNSUService) {
        this.nfeDistribuicaoDFePorNSUService = nfeDistribuicaoDFePorNSUService;
    }
    async Exec(data) {
        return await this.nfeDistribuicaoDFePorNSUService.Exec(data);
    }
}
export default NFEDistribuicaoDFePorNSU;
//# sourceMappingURL=NFEDistribuicaoDFePorNSU.js.map