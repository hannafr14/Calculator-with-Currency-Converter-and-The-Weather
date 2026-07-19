import { convertCurrencyAmount } from '../services/currencyService'

export async function handleCurrencyConversion(amount, fromCurrency, toCurrency) {
  if (!amount || amount <= 0) {
    throw new Error('Introduce una cantidad valida')
  }

  return await convertCurrencyAmount(amount, fromCurrency, toCurrency)
}