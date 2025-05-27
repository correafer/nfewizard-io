import { NFEDistribuicaoDFeServiceImpl } from '@Interfaces';
declare class NFEDistribuicaoDFePorChave implements NFEDistribuicaoDFeServiceImpl {
    nfeDistribuicaoDFePorChaveService: NFEDistribuicaoDFeServiceImpl;
    constructor(nfeDistribuicaoDFePorChaveService: NFEDistribuicaoDFeServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEDistribuicaoDFePorChave;
//# sourceMappingURL=NFEDistribuicaoDFePorChave.d.ts.map