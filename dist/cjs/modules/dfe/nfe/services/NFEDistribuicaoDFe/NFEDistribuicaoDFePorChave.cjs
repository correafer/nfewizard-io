"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NFEDistribuicaoDFeService_js_1 = __importDefault(require("./NFEDistribuicaoDFeService.js"));
class NFEDistribuicaoDFePorChaveService extends NFEDistribuicaoDFeService_js_1.default {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta);
    }
}
exports.default = NFEDistribuicaoDFePorChaveService;
//# sourceMappingURL=NFEDistribuicaoDFePorChave.js.map