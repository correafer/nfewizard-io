import { AxiosInstance } from 'axios';
import Environment from '../../../../../../modules/environment/Environment.js';
import Utility from '../../../../../../core/utils/Utility.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder.js';
import { EventoNFe, GenericObject, TipoEvento } from '../../../../../../core/types/index';
import BaseNFE from '../../../../../../modules/dfe/base/BaseNFe.js';
import { GerarConsultaImpl, NFERecepcaoEventoServiceImpl, SaveFilesImpl } from '../../../../../../core/interfaces/index';
declare class NFERecepcaoEventoService extends BaseNFE implements NFERecepcaoEventoServiceImpl {
    tpEvento: string;
    modelo?: string;
    xmlEventosNacionais: string[];
    xmlEventosRegionais: string[];
    xMotivoPorEvento: any[];
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    /**
     * Método para gerar o Id do evento
     */
    private getID;
    /**
     * Verifica se o evento será disparado para o ambiente nacional ou para o estado pré-definido
     */
    private isAmbienteNacional;
    /**
     * Retorna o nome do Evento
     */
    private getTipoEventoName;
    private separaEventosPorAmbiente;
    /**
     * Criação do XML
     */
    private gerarXmlRecepcaoEvento;
    private trataRetorno;
    protected enviaEvento(evento: TipoEvento[], idLote: number, tipoAmbiente: number): Promise<any>;
    Exec(data: EventoNFe): Promise<{
        success: boolean;
        xMotivos: any[];
        response: GenericObject[];
    }>;
}
export default NFERecepcaoEventoService;
