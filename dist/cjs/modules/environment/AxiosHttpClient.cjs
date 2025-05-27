"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AxiosHttpClient {
    create(config) {
        return axios_1.default.create({
            headers: config.headers,
            httpsAgent: config.agent,
            timeout: config.timeout,
        });
    }
}
exports.default = AxiosHttpClient;
//# sourceMappingURL=AxiosHttpClient.js.map