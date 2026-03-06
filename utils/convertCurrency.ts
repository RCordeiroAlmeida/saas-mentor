/**
 * Converte valores monetários em reais para centavos
 * @param {string} amount - O valor monetário em reais (BRL) a ser convertido
 * @returns O valor convertido em centavos
 * 
 * @exemple
 * 
 * convertRealToCents("1.300,50"); // retorna: 123456 cents
 */
export function convertRealToCents(amount: string){
    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    const priceInCents = Math.round(numericPrice * 100)
    
    return priceInCents;
}