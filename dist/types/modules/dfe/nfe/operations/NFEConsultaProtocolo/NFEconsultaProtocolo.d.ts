import { NFEconsultaProtocoloServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEConsultaProtocolo implements NFEconsultaProtocoloServiceImpl {
    nfeConsultaProtocoloService: NFEconsultaProtocoloServiceImpl;
    constructor(nfeConsultaProtocoloService: NFEconsultaProtocoloServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEConsultaProtocolo;
