
/**
 * Formata uma string com máscara para telefones 
 * @param value 
 * @returns (XX) XXXXX-XXXX
 */
export function formatPhone(value: string) {

    // Remove tudo que não for número
    const cleaned = value.replace(/\D/g, '');

    // Verifica se tem 11 caracteres
    if (cleaned.length > 11) {
        return value.slice(0, 15);
    }

    const formatted = cleaned
    .replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses no DDD
    .replace(/(\d{5})(\d{4})$/, '$1-$2'); // Coloca hífen entre o quinto e o sexto dígito
    
    return formatted;
}

export function unformatPhone(value: string) {
    // Remove tudo que não for número
    const cleaned = value.replace(/\D/g, '');
    return cleaned;
}
