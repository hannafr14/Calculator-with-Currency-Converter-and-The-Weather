import { CurrencyRates } from '../models/currencyRates'

export function mapCurrencyRatesDtoToModel(dto) {
  return new CurrencyRates(dto.date, {
    USD: 1,
    EUR: Number(dto.rates.EUR),
    JPY: Number(dto.rates.JPY),
  })
}