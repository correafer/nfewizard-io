import { NFEDistribuicaoDFeServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEDistribuicaoDFePorUltNSU implements NFEDistribuicaoDFeServiceImpl {
    nfeDistribuicaoDFePorUltNSUService: NFEDistribuicaoDFeServiceImpl;
    constructor(nfeDistribuicaoDFePorUltNSUService: NFEDistribuicaoDFeServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEDistribuicaoDFePorUltNSU;
