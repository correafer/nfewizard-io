import { NFEDistribuicaoDFeServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEDistribuicaoDFePorChave implements NFEDistribuicaoDFeServiceImpl {
    nfeDistribuicaoDFePorChaveService: NFEDistribuicaoDFeServiceImpl;
    constructor(nfeDistribuicaoDFePorChaveService: NFEDistribuicaoDFeServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEDistribuicaoDFePorChave;
