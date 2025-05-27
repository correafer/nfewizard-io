"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const getCodIBGE_js_1 = require("@Utils/getCodIBGE.js");
const BaseNFe_js_1 = __importDefault(require("@Modules/dfe/base/BaseNFe.js"));
class NFEStatusServicoService extends BaseNFe_js_1.default {
    constructor(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta) {
        super(environment, utility, xmlBuilder, 'NFEStatusServico', axios, saveFiles, gerarConsulta);
    }
    gerarXml() {
        try {
            const { nfe: { ambiente, versaoDF }, dfe: { UF } } = this.environment.getConfig();
            const xmlObject = {
                $: {
                    versao: versaoDF,
                    xmlns: 'http://www.portalfiscal.inf.br/nfe'
                },
                tpAmb: ambiente,
                cUF: (0, getCodIBGE_js_1.getCodIBGE)(UF),
                xServ: 'STATUS',
            };
            return this.xmlBuilder.gerarXml(xmlObject, 'consStatServ');
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = NFEStatusServicoService;
//# sourceMappingURL=NFEStatusServicoService.js.map