import { COFINS, ICMS, PIS, dadosCOFINS, dadosICMS, dadosPIS } from 'src/core/types';
export declare const mountCOFINS: (cofins: dadosCOFINS) => COFINS;
export declare const mountPIS: (pis: dadosPIS) => PIS;
export declare const mountICMS: (icms: dadosICMS) => ICMS;
