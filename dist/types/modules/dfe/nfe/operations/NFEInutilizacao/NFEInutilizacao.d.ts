import { NFEInutilizacaoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEInutilizacao implements NFEInutilizacaoServiceImpl {
    nfeInutilizacaoService: NFEInutilizacaoServiceImpl;
    constructor(nfeInutilizacaoService: NFEInutilizacaoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEInutilizacao;
