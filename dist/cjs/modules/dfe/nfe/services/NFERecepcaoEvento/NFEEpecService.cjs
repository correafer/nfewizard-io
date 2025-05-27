"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NFERecepcaoEventoService_1 = __importDefault(require("./NFERecepcaoEventoService.cjs"));
class NFEEpecService extends NFERecepcaoEventoService_1.default {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta);
    }
}
exports.default = NFEEpecService;
//# sourceMappingURL=NFEEpecService.js.map