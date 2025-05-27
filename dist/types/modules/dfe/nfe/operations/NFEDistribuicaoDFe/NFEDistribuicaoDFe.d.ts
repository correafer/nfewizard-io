import { NFEDistribuicaoDFeServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFERecepcaoEvento implements NFEDistribuicaoDFeServiceImpl {
    nfeDistribuicaoDFeService: NFEDistribuicaoDFeServiceImpl;
    constructor(nfeDistribuicaoDFeService: NFEDistribuicaoDFeServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFERecepcaoEvento;
