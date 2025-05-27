declare class ValidaCPFCNPJ {
    constructor();
    /**
     * Valida o CPF ou CNPJ.
     * @param cpfCnpj CPF ou CNPJ à validar.
     * @returns Retorna um objeto com o tipo do documento e um boolean se é um documento válido ou não
     */
    validarCpfCnpj(cpfCnpj: string): {
        documentoValido: boolean;
        tipoDoDocumento: 'CPF' | 'CNPJ' | 'Desconhecido';
    };
    /**
     * Validoa o CPF
     * @param cpf
     * @returns Retorna se o CPF é valido ou não
     */
    private documentoValidoateCpf;
    /**
     * Validoa o CNPJ
     * @param CNPJ
     * @returns Retorna se o CNPJ é valido ou não
     */
    private documentoValidoateCnpj;
    /**
     * Adiciona máscara ao CPF/CNPJ.
     * @param cpfCnpj CPF ou CNPJ à adicionar máscara.
     * @returns Retorna o documento com máscara.
     */
    mascaraCnpjCpf(cpfcnpj: string): string;
}
export default ValidaCPFCNPJ;
