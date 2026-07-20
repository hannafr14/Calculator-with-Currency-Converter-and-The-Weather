import { describe, expect, it, vi } from 'vitest'
import { handleCurrencyConversion } from '../controllers/currencyController'
import { convertCurrencyAmount } from '../services/currencyService'

vi.mock('../services/currencyService', () => {
  return {
    convertCurrencyAmount: vi.fn(),
  }
})

describe('currencyController', () => {
  it('returns conversion result for valid data', async () => {
    convertCurrencyAmount.mockResolvedValue({
      result: '108.47',
      rateText: '1 EUR = 1.0847 USD',
      updatedAt: '2026-07-20',
    })

    const result = await handleCurrencyConversion(100, 'EUR', 'USD')

    expect(result.result).toBe('108.47')
    expect(result.rateText).toBe('1 EUR = 1.0847 USD')
    expect(result.updatedAt).toBe('2026-07-20')
    expect(convertCurrencyAmount).toHaveBeenCalledWith(100, 'EUR', 'USD')
  })

  it('throws an error when amount is empty', async () => {
    await expect(handleCurrencyConversion('', 'EUR', 'USD')).rejects.toThrow(
      'Introduce una cantidad valida',
    )
  })

  it('throws an error when amount is zero', async () => {
    await expect(handleCurrencyConversion(0, 'EUR', 'USD')).rejects.toThrow(
      'Introduce una cantidad valida',
    )
  })

  it('throws an error when amount is negative', async () => {
    await expect(handleCurrencyConversion(-5, 'EUR', 'USD')).rejects.toThrow(
      'Introduce una cantidad valida',
    )
  })
})