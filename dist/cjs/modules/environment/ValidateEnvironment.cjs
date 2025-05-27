"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateEnvironment {
    checkRequiredSettings(config) {
        try {
            const requiredConfigFields = {
                dfe: ['pathCertificado', 'senhaCertificado'],
                nfe: ['ambiente']
            };
            let missingConfigurations = {
                dfe: [],
                nfe: []
            };
            let errors = [];
            let tableData = [];
            Object.keys(requiredConfigFields).forEach((categoryKey) => {
                const category = config[categoryKey];
                // Verifica se a chave principal existe
                if (!category) {
                    errors.push(`Chave principal faltando: '${categoryKey}'.`);
                    tableData.push({ Categoria: categoryKey, Faltando: `Chave principal faltando` });
                }
                else {
                    const fields = requiredConfigFields[categoryKey];
                    if (fields) {
                        fields.forEach((fieldKey) => {
                            // Garante que missingConfigurations[categoryKey] é um array
                            if (!missingConfigurations[categoryKey]) {
                                missingConfigurations[categoryKey] = [];
                            }
                            // Verifica se o campo está presente
                            if (category[fieldKey] === undefined) {
                                // Garante que a propriedade está definida
                                if (!missingConfigurations[categoryKey]) {
                                    missingConfigurations[categoryKey] = [];
                                }
                                missingConfigurations[categoryKey].push(fieldKey);
                            }
                        });
                        // Garante que missingConfigurations[categoryKey] é um array
                        const missingConfig = missingConfigurations[categoryKey];
                        if (missingConfig && missingConfig.length > 0) {
                            errors.push(`Configurações faltando em '${categoryKey}': [${missingConfig.join(', ')}].`);
                            tableData.push({ Categoria: categoryKey, Faltando: missingConfig.join(', ') });
                        }
                    }
                }
            });
            if (errors.length > 0) {
                console.log("Configurações necessárias faltando:");
                console.table(tableData);
                throw new Error(`Erro ao validar configurações: ${errors.join(' ')}`);
            }
            return {
                missingConfigurations,
                message: 'Todas as configurações necessárias estão presentes.',
                success: true,
            };
        }
        catch (error) {
            throw new Error(`Erro ao validar configurações: ${error.message}`);
        }
    }
}
exports.default = ValidateEnvironment;
//# sourceMappingURL=ValidateEnvironment.js.map