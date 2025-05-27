class NFEEpec {
    constructor(nfeEpecServiceService) {
        this.nfeEpecServiceService = nfeEpecServiceService;
    }
    async Exec(data) {
        return await this.nfeEpecServiceService.Exec(data);
    }
}
export default NFEEpec;
//# sourceMappingURL=NFEEpec.js.map