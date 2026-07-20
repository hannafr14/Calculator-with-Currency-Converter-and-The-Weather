import { describe, expect, it, vi } from 'vitest'
import {
  handleAsturiasMunicipalitiesRequest,
  handleAsturiasMunicipalityWeatherRequest,
  handleMunicipalitiesByProvinceRequest,
  handleMunicipalityWeatherRequest,
  handleNationalWeatherRequest,
  handleProvincesRequest,
} from '../controllers/weatherController'

import {
  getAsturiasMunicipalities,
  getAsturiasMunicipalityWeather,
  getMunicipalitiesByProvince,
  getMunicipalityWeather,
  getNationalWeather,
  getProvinces,
} from '../services/weatherService'

vi.mock('../services/weatherService', () => {
  return {
    getAsturiasMunicipalities: vi.fn(),
    getAsturiasMunicipalityWeather: vi.fn(),
    getMunicipalitiesByProvince: vi.fn(),
    getMunicipalityWeather: vi.fn(),
    getNationalWeather: vi.fn(),
    getProvinces: vi.fn(),
  }
})

describe('weatherController', () => {
  it('returns national weather', async () => {
    getNationalWeather.mockResolvedValue({ place: 'España' })

    const result = await handleNationalWeatherRequest()

    expect(result.place).toBe('España')
    expect(getNationalWeather).toHaveBeenCalled()
  })

  it('returns provinces', async () => {
    getProvinces.mockResolvedValue([{ CODPROV: '33', NOMBRE_PROVINCIA: 'Asturias' }])

    const result = await handleProvincesRequest()

    expect(result).toHaveLength(1)
    expect(result[0].NOMBRE_PROVINCIA).toBe('Asturias')
  })

  it('returns municipalities by province', async () => {
    getMunicipalitiesByProvince.mockResolvedValue([{ id: '33024', name: 'Gijón' }])

    const result = await handleMunicipalitiesByProvinceRequest('33')

    expect(result[0].name).toBe('Gijón')
    expect(getMunicipalitiesByProvince).toHaveBeenCalledWith('33')
  })

  it('throws an error when province is missing', async () => {
    await expect(handleMunicipalitiesByProvinceRequest('')).rejects.toThrow(
      'Selecciona una provincia',
    )
  })

  it('returns municipality weather', async () => {
    getMunicipalityWeather.mockResolvedValue({ place: 'Gijón' })

    const result = await handleMunicipalityWeatherRequest('33', '33024')

    expect(result.place).toBe('Gijón')
    expect(getMunicipalityWeather).toHaveBeenCalledWith('33', '33024')
  })

  it('throws an error when municipality province is missing', async () => {
    await expect(handleMunicipalityWeatherRequest('', '33024')).rejects.toThrow(
      'Selecciona una provincia',
    )
  })

  it('throws an error when municipality is missing', async () => {
    await expect(handleMunicipalityWeatherRequest('33', '')).rejects.toThrow(
      'Selecciona un municipio',
    )
  })

  it('returns Asturias municipalities', async () => {
    getAsturiasMunicipalities.mockResolvedValue([{ id: '33024', name: 'Gijón' }])

    const result = await handleAsturiasMunicipalitiesRequest()

    expect(result[0].name).toBe('Gijón')
  })

  it('returns Asturias municipality weather', async () => {
    getAsturiasMunicipalityWeather.mockResolvedValue({ place: 'Oviedo' })

    const result = await handleAsturiasMunicipalityWeatherRequest('33044')

    expect(result.place).toBe('Oviedo')
    expect(getAsturiasMunicipalityWeather).toHaveBeenCalledWith('33044')
  })

  it('throws an error when Asturias municipality is missing', async () => {
    await expect(handleAsturiasMunicipalityWeatherRequest('')).rejects.toThrow(
      'Selecciona un municipio',
    )
  })
})