import { HttpClient, HttpClientConfig } from '@Interfaces';
import { AxiosInstance } from 'axios';
declare class AxiosHttpClient implements HttpClient<AxiosInstance> {
    create(config: HttpClientConfig): AxiosInstance;
}
export default AxiosHttpClient;
//# sourceMappingURL=AxiosHttpClient.d.ts.map