import { describe, expect, it } from 'vitest'
import { calculateCurrency } from '../services/currencyService'

describe('calculateCurrency', () => {
  it('converts an amount using currency rates', () => {
    const result = calculateCurrency(100, 1, 0.9)

    expect(result).toBe('90.00')
  })

  it('returns the same amount when rates are equal', () => {
    const result = calculateCurrency(100, 0.9, 0.9)

    expect(result).toBe('100.00')
  })

  it('converts decimal amounts', () => {
    const result = calculateCurrency(12.5, 1, 2)

    expect(result).toBe('25.00')
  })

  it('rounds the result to two decimals', () => {
    const result = calculateCurrency(10, 3, 1)

    expect(result).toBe('3.33')
  })
})