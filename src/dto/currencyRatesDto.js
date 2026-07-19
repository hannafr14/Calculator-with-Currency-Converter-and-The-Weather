export function createCurrencyRatesDto(data) {
  return {
    date: data.date,
    rates: data.rates,
  }
}