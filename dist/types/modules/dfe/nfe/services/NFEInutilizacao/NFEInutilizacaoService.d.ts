import Environment from '../../../../../../modules/environment/Environment.js';
import Utility from '../../../../../../core/utils/Utility.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder.js';
import { InutilizacaoData } from '../../../../../../core/types/index';
import BaseNFE from '../../../../../../modules/dfe/base/BaseNFe.js';
import { AxiosInstance } from 'axios';
import { GerarConsultaImpl, NFEInutilizacaoServiceImpl, SaveFilesImpl } from '../../../../../../core/interfaces/index';
declare class NFEInutilizacaoService extends BaseNFE implements NFEInutilizacaoServiceImpl {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(chave: InutilizacaoData): string;
    /**
     * Método para criação do ID de Inutilização
     */
    private criarId;
    /**
     * Método utilitário para criação do XML a partir de um Objeto
     */
    gerarXmlNFeInutilizacao(data: InutilizacaoData): string;
}
export default NFEInutilizacaoService;
