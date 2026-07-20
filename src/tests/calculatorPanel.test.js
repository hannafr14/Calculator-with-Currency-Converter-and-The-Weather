import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import CalculatorPanel from '../components/CalculatorPanel.vue'

describe('CalculatorPanel', () => {
  it('shows zero as initial display value', () => {
    const wrapper = mount(CalculatorPanel, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.find('.calculator-display').text()).toBe('0')
  })
})

it('clears display when CE is clicked', async () => {
  const wrapper = mount(CalculatorPanel, {
    global: {
      plugins: [createPinia()],
    },
  })

  await wrapper.findAll('button').find((button) => button.text() === '9').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === 'CE').trigger('click')

  expect(wrapper.find('.calculator-display').text()).toBe('0')
})

it('calculates a basic sum', async () => {
  const wrapper = mount(CalculatorPanel, {
    global: {
      plugins: [createPinia()],
    },
  })

  await wrapper.findAll('button').find((button) => button.text() === '2').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '+').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '3').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '=').trigger('click')

  expect(wrapper.find('.calculator-display').text()).toBe('5')
})

it('shows Error when dividing by zero', async () => {
  const wrapper = mount(CalculatorPanel, {
    global: {
      plugins: [createPinia()],
    },
  })

  await wrapper.findAll('button').find((button) => button.text() === '8').trigger('click')
  await wrapper.findAll('button').find((button) => button.classes().includes('operator-button')).trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '0').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '=').trigger('click')

  expect(wrapper.find('.calculator-display').text()).toBe('Error')
})

it('adds decimal numbers', async () => {
  const wrapper = mount(CalculatorPanel, {
    global: {
      plugins: [createPinia()],
    },
  })

  await wrapper.findAll('button').find((button) => button.text() === '1').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '.').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '5').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '+').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '2').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === '=').trigger('click')

  expect(wrapper.find('.calculator-display').text()).toBe('3.5')
})

it('stores and recalls memory value', async () => {
  const wrapper = mount(CalculatorPanel, {
    global: {
      plugins: [createPinia()],
    },
  })

  await wrapper.findAll('button').find((button) => button.text() === '7').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === 'M+').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === 'CE').trigger('click')
  await wrapper.findAll('button').find((button) => button.text() === 'MR').trigger('click')

  expect(wrapper.find('.calculator-display').text()).toBe('7')
})