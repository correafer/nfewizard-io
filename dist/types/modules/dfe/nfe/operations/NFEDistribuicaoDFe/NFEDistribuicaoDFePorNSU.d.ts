import { NFEDistribuicaoDFeServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEDistribuicaoDFePorNSU implements NFEDistribuicaoDFeServiceImpl {
    nfeDistribuicaoDFePorNSUService: NFEDistribuicaoDFeServiceImpl;
    constructor(nfeDistribuicaoDFePorNSUService: NFEDistribuicaoDFeServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEDistribuicaoDFePorNSU;
