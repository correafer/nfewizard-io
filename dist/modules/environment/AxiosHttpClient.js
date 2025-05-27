import axios from 'axios';
class AxiosHttpClient {
    create(config) {
        return axios.create({
            headers: config.headers,
            httpsAgent: config.agent,
            timeout: config.timeout,
        });
    }
}
export default AxiosHttpClient;
//# sourceMappingURL=AxiosHttpClient.js.map