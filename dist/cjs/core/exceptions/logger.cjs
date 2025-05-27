"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: 'error', // Apenas logs de erro
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(), // Mostra logs no console
        new winston_1.default.transports.File({ filename: 'tmp/logs/errors.json' }) // Salva logs em um arquivo
    ],
});
// import winston from 'winston';
// import path from 'path';
// export const logger = winston.createLogger({
//   level: 'error', // Apenas logs de erro
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.printf(({ timestamp, level, message, ...meta }) => {
//       return `[${timestamp}] [${level.toUpperCase()}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
//     })
//   ),
//   transports: [
//     new winston.transports.Console(), // Mostra logs no console
//     new winston.transports.File({ 
//       filename: 'errors.log', 
//       level: 'error' 
//     }) // Salva logs em um arquivo
//   ],
// });
//# sourceMappingURL=logger.js.map