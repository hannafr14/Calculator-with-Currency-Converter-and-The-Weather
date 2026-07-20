import { describe, expect, it, vi } from 'vitest'
import {
  getAsturiasMunicipalities,
  getAsturiasMunicipalityWeather,
  getMunicipalitiesByProvince,
  getMunicipalityWeather,
  getNationalWeather,
  getProvinces,
} from '../services/weatherService'

import {
  fetchAsturiasMunicipalities,
  fetchAsturiasMunicipalityWeather,
  fetchMunicipalitiesByProvince,
  fetchMunicipalityWeather,
  fetchNationalWeather,
  fetchProvinces,
} from '../repositories/weatherRepository'

vi.mock('../repositories/weatherRepository', () => {
  return {
    fetchAsturiasMunicipalities: vi.fn(),
    fetchAsturiasMunicipalityWeather: vi.fn(),
    fetchMunicipalitiesByProvince: vi.fn(),
    fetchMunicipalityWeather: vi.fn(),
    fetchNationalWeather: vi.fn(),
    fetchProvinces: vi.fn(),
  }
})

describe('weatherService', () => {
  it('returns national weather', async () => {
    fetchNationalWeather.mockResolvedValue({
      title: 'El Tiempo',
      nombre: 'España',
      stateSky: {
        description: 'Despejado',
      },
      temperatura_actual: '25',
      temperaturas: {
        max: '30',
        min: '18',
      },
      humedad: '50',
      viento: '10',
      elaborado: '2026-07-20',
    })

    const weather = await getNationalWeather()

    expect(weather.place).toBe('España')
    expect(weather.description).toBe('Despejado')
    expect(weather.temperature).toBe('25')
  })

  it('returns provinces', async () => {
    fetchProvinces.mockResolvedValue({
      provincias: [
        {
          CODPROV: '33',
          NOMBRE_PROVINCIA: 'Asturias',
        },
      ],
    })

    const provinces = await getProvinces()

    expect(provinces).toHaveLength(1)
    expect(provinces[0].CODPROV).toBe('33')
  })

  it('returns empty provinces when API has no provinces', async () => {
    fetchProvinces.mockResolvedValue({})

    const provinces = await getProvinces()

    expect(provinces).toEqual([])
  })

  it('returns municipalities by province', async () => {
    fetchMunicipalitiesByProvince.mockResolvedValue({
      municipios: [
        {
          CODIGOINE: '33024000000',
          NOMBRE: 'Gijón',
        },
      ],
    })

    const municipalities = await getMunicipalitiesByProvince('33')

    expect(municipalities[0].id).toBe('33024')
    expect(municipalities[0].name).toBe('Gijón')
  })

  it('returns municipality weather', async () => {
    fetchMunicipalityWeather.mockResolvedValue({
      municipio: {
        NOMBRE: 'Oviedo',
      },
      stateSky: {
        description: 'Nuboso',
      },
      temperatura_actual: '19',
      temperaturas: {
        max: '24',
        min: '15',
      },
      humedad: '84',
      viento: '7',
      elaborado: '2026-07-20',
    })

    const weather = await getMunicipalityWeather('33', '33044')

    expect(weather.place).toBe('Oviedo')
    expect(weather.description).toBe('Nuboso')
  })

  it('returns Asturias municipalities', async () => {
    fetchAsturiasMunicipalities.mockResolvedValue({
      municipios: [
        {
          CODIGOINE: '33024000000',
          NOMBRE: 'Gijón',
        },
      ],
    })

    const municipalities = await getAsturiasMunicipalities()

    expect(municipalities[0].name).toBe('Gijón')
  })

  it('returns Asturias municipality weather', async () => {
    fetchAsturiasMunicipalityWeather.mockResolvedValue({
      municipio: {
        NOMBRE: 'Avilés',
      },
      stateSky: {
        description: 'Lluvia',
      },
      temperatura_actual: '17',
      temperaturas: {
        max: '20',
        min: '12',
      },
      humedad: '90',
      viento: '12',
      elaborado: '2026-07-20',
    })

    const weather = await getAsturiasMunicipalityWeather('33004')

    expect(weather.place).toBe('Avilés')
    expect(weather.description).toBe('Lluvia')
  })
})