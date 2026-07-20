import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherPanel from '../components/WeatherPanel.vue'

vi.mock('../controllers/weatherController', () => {
  return {
    handleProvincesRequest: vi.fn().mockResolvedValue([
      {
        CODPROV: '33',
        NOMBRE_PROVINCIA: 'Asturias',
      },
    ]),
    handleMunicipalitiesByProvinceRequest: vi.fn().mockResolvedValue([
      {
        id: '33024',
        name: 'Gijón',
      },
    ]),
    handleMunicipalityWeatherRequest: vi.fn().mockResolvedValue({
      place: 'Gijón',
      description: 'Nuboso',
      stateSky: 'Nuboso',
      temperature: '19',
      maxTemp: '24',
      minTemp: '15',
      humidity: '84%',
      wind: '7 km/h',
      updatedAt: '2026-07-20',
    }),
    handleAsturiasMunicipalitiesRequest: vi.fn().mockResolvedValue([
      {
        id: '33044',
        name: 'Oviedo',
      },
    ]),
    handleAsturiasMunicipalityWeatherRequest: vi.fn().mockResolvedValue({
      place: 'Oviedo',
      description: 'Despejado',
      stateSky: 'Despejado',
      temperature: '22',
      maxTemp: '27',
      minTemp: '16',
      humidity: '60%',
      wind: '5 km/h',
      updatedAt: '2026-07-20',
    }),
  }
})

function waitAsyncUpdates() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('WeatherPanel', () => {
  it('renders weather panel title and tabs', async () => {
    const wrapper = mount(WeatherPanel)

    await waitAsyncUpdates()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('El Tiempo')
    expect(wrapper.text()).toContain('Nacional')
    expect(wrapper.text()).toContain('Asturias')
  })

  it('loads national weather on mount', async () => {
    const wrapper = mount(WeatherPanel)

    await waitAsyncUpdates()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Provincia')
    expect(wrapper.text()).toContain('Asturias')
    expect(wrapper.text()).toContain('Gijón')
    expect(wrapper.text()).toContain('Nuboso')
  })

  it('loads Asturias weather after clicking Asturias tab', async () => {
    const wrapper = mount(WeatherPanel)

    await waitAsyncUpdates()
    await wrapper.vm.$nextTick()

    const asturiasButton = wrapper.findAll('button').find((button) => {
      return button.text() === 'Asturias'
    })

    await asturiasButton.trigger('click')
    await waitAsyncUpdates()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Municipio')
    expect(wrapper.text()).toContain('Oviedo')
    expect(wrapper.text()).toContain('Despejado')
  })
})