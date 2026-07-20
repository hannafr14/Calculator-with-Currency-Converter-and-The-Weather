import { describe, expect, it } from 'vitest'
import { createCurrencyRatesDto } from '../dto/currencyRatesDto'
import { mapCurrencyRatesDtoToModel } from '../mappers/currencyMapper'

describe('currency mapper', () => {
  it('creates currency rates dto from API data', () => {
    const apiData = {
      date: '2026-07-20',
      rates: {
        EUR: '0.86',
        USD: '1',
        JPY: '147.5',
      },
    }

    const dto = createCurrencyRatesDto(apiData)

    expect(dto.date).toBe('2026-07-20')
    expect(dto.rates.EUR).toBe('0.86')
    expect(dto.rates.JPY).toBe('147.5')
  })

  it('maps currency rates dto to currency rates model', () => {
    const dto = {
      date: '2026-07-20',
      rates: {
        EUR: '0.86',
        JPY: '147.5',
      },
    }

    const currencyRates = mapCurrencyRatesDtoToModel(dto)

    expect(currencyRates.date).toBe('2026-07-20')
    expect(currencyRates.getRate('USD')).toBe(1)
    expect(currencyRates.getRate('EUR')).toBe(0.86)
    expect(currencyRates.getRate('JPY')).toBe(147.5)
  })
})