import { HttpClient, HttpClientConfig } from '../../../core/interfaces/index';
import { AxiosInstance } from 'axios';
declare class AxiosHttpClient implements HttpClient<AxiosInstance> {
    create(config: HttpClientConfig): AxiosInstance;
}
export default AxiosHttpClient;
