class GerarConsulta {
    utility;
    environment;
    xmlBuilder;
    constructor(environment, utility, xmlBuilder) {
        this.environment = environment;
        this.utility = utility;
        this.xmlBuilder = xmlBuilder;
    }
    async gerarConsulta(xmlConsulta, metodo, ambienteNacional = false, versao = "", mod = "NFe", rootTag = false, tag = "") {
        try {
            const config = this.environment.getConfig();
            // Valida Schema
            if (config.lib?.useForSchemaValidation !== 'validateSchemaJsBased') {
                await this.utility.validateSchemaJavaBased(xmlConsulta, metodo);
            }
            else {
                await this.utility.validateSchemaJsBased(xmlConsulta, metodo);
            }
            // Capturando a url do método para o namespace xmlns
            const { method, action } = this.utility.getSoapInfo(config.dfe.UF, metodo);
            // Criando envelop SOAP (estrutura para e envio do XML)
            let rootTagObj = null;
            if (rootTag) {
                rootTagObj = {
                    tag,
                    namespace: method,
                };
            }
            const xmlFormated = this.xmlBuilder.buildSoapEnvelope(xmlConsulta, method, 'soap12', rootTagObj);
            // Retorna o Http.Agent contendo os certificados das Autoridades Certificadoras
            const agent = this.environment.getHttpAgent();
            // Retorna a url do webservice NFEStatusServico
            const webServiceUrl = this.utility.getWebServiceUrl(metodo, ambienteNacional, versao, mod);
            return {
                xmlFormated,
                agent,
                webServiceUrl,
                action
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
export default GerarConsulta;
//# sourceMappingURL=GerarConsulta.js.map