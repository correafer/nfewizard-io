import { NFEDistribuicaoDFeServiceImpl } from '@Interfaces';
declare class NFERecepcaoEvento implements NFEDistribuicaoDFeServiceImpl {
    nfeDistribuicaoDFeService: NFEDistribuicaoDFeServiceImpl;
    constructor(nfeDistribuicaoDFeService: NFEDistribuicaoDFeServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFERecepcaoEvento;
//# sourceMappingURL=NFEDistribuicaoDFe.d.ts.map