import Environment from '../../modules/environment/Environment.js';
export interface NamespacesProps {
    [key: string]: string;
}
export interface BodyContentProps {
    [key: string]: any;
}
export interface SoapEnvelopeObjProps {
    [key: string]: any;
}
declare class XmlBuilder {
    environment: Environment;
    constructor(environment: Environment);
    /**
     * Método para assinar o XML
     */
    assinarXML(xml: string, tagAssinar: string): string;
    /**
     * Método que converte Objeto em XML
     */
    serializeXml<T>(obj: T, rootTag: string): string;
    /**
     * Método genérico para geração do XML
     */
    gerarXml<T>(xmlObject: T, rootTag: string): string;
    /**
     *  Método utilizado para cirar um envelop SOAP - Formato de mensagem para serviço SOAP (como o da SEFAZ)
     */
    buildSoapEnvelope(xml: string, soapMethod: string, soapVersion?: string, rootTagObj?: any): string;
}
export default XmlBuilder;
