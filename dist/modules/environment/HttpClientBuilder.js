class HttpClientBuilder {
    config;
    agent;
    httpClient;
    constructor(config, agent, httpClient) {
        this.config = config;
        this.agent = agent;
        this.httpClient = httpClient;
    }
    createHttpClient() {
        try {
            const axiosConfig = {
                headers: {
                    'Content-Type': 'text/xml; charset=utf-8',
                },
                httpsAgent: this.agent,
                timeout: this.config.lib?.connection?.timeout || 60000, // Timeout padrão de 60 segundos se não for configurado
            };
            return this.httpClient.create(axiosConfig);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
export default HttpClientBuilder;
//# sourceMappingURL=HttpClientBuilder.js.map