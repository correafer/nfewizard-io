"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
/*
 * This file is part of NFeWizard-io.
 *
 * NFeWizard-io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NFeWizard-io is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NFeWizard-io. If not, see <https://www.gnu.org/licenses/>.
 */
const path_1 = __importDefault(require("path"));
const baseDir = __dirname;
const dir = process.env.NODE_ENV === 'production' ? '../resources/schemas' : '../resources/schemas/';
const getSchema = (metodo) => {
    const pathSchemas = path_1.default.resolve(baseDir, dir);
    const schema = {
        NFEStatusServico: `${pathSchemas}/consStatServ_v4.00.xsd`,
        NFEConsultaProtocolo: `${pathSchemas}/consSitNFe_v4.00.xsd`,
        RecepcaoEvento: `${pathSchemas}/envEvento_v1.00.xsd`,
        NFeDistribuicaoDFe: `${pathSchemas}/distDFeInt_v1.01.xsd`,
        NFEAutorizacao: `${pathSchemas}/enviNFe_v4.00.xsd`,
        NFEInutilizacao: `${pathSchemas}/inutNFe_v4.00.xsd`,
        NFERetAutorizacao: `${pathSchemas}/consReciNFe_v4.00.xsd`,
    };
    try {
        return {
            basePath: pathSchemas,
            schemaPath: schema[metodo]
        };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getSchema = getSchema;
//# sourceMappingURL=SchemaLoader.js.map