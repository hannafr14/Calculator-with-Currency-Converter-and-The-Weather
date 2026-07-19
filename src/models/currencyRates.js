export class CurrencyRates {
  constructor(date, rates) {
    this.date = date
    this.rates = rates
  }

  getRate(currency) {
    return this.rates[currency]
  }
}