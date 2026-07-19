import { fetchCurrencyRates } from '../repositories/currencyRepository'
import { createCurrencyRatesDto } from '../dto/currencyRatesDto'
import { mapCurrencyRatesDtoToModel } from '../mappers/currencyMapper'

export async function convertCurrencyAmount(amount, fromCurrency, toCurrency) {
  const rawData = await fetchCurrencyRates()
  const dto = createCurrencyRatesDto(rawData)
  const currencyRates = mapCurrencyRatesDtoToModel(dto)

  const fromRate = currencyRates.getRate(fromCurrency)
  const toRate = currencyRates.getRate(toCurrency)

  const amountInUsd = Number(amount) / fromRate
  const convertedAmount = amountInUsd * toRate

  return {
    result: convertedAmount.toFixed(2),
    rateText: `1 ${fromCurrency} = ${(toRate / fromRate).toFixed(4)} ${toCurrency}`,
    updatedAt: currencyRates.date,
  }
}