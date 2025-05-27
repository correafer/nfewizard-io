import { NFEDistribuicaoDFeServiceImpl } from '@Interfaces';
declare class NFEDistribuicaoDFePorNSU implements NFEDistribuicaoDFeServiceImpl {
    nfeDistribuicaoDFePorNSUService: NFEDistribuicaoDFeServiceImpl;
    constructor(nfeDistribuicaoDFePorNSUService: NFEDistribuicaoDFeServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEDistribuicaoDFePorNSU;
//# sourceMappingURL=NFEDistribuicaoDFePorNSU.d.ts.map