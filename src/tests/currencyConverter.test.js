import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CurrencyConverter from '../components/CurrencyConverter.vue'
import { handleCurrencyConversion } from '../controllers/currencyController'

vi.mock('../controllers/currencyController', () => {
  return {
    handleCurrencyConversion: vi.fn(),
  }
})

describe('CurrencyConverter', () => {
  it('shows empty result initially', () => {
    const wrapper = mount(CurrencyConverter)

    expect(wrapper.text()).toContain('Conversor de Divisas')
    expect(wrapper.text()).toContain('Resultado:')
    expect(wrapper.text()).toContain('--')
  })

  it('shows conversion result after clicking convert', async () => {
    handleCurrencyConversion.mockResolvedValue({
      result: '108.47',
      rateText: '1 EUR = 1.0847 USD',
      updatedAt: '2026-07-20',
    })

    const wrapper = mount(CurrencyConverter)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('108.47')
    expect(wrapper.text()).toContain('USD')
    expect(wrapper.text()).toContain('1 EUR = 1.0847 USD')
    expect(wrapper.text()).toContain('2026-07-20')
  })

  it('shows an error message when conversion fails', async () => {
    handleCurrencyConversion.mockRejectedValue(new Error('API error'))

    const wrapper = mount(CurrencyConverter)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('API error')
  })
})