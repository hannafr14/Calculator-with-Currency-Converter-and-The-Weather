import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import {
  fetchAsturiasMunicipalities,
  fetchAsturiasMunicipalityWeather,
  fetchMunicipalitiesByProvince,
  fetchMunicipalityWeather,
  fetchNationalWeather,
  fetchProvinces,
} from '../repositories/weatherRepository'

vi.mock('axios')

describe('weatherRepository', () => {
  it('fetches national weather', async () => {
    axios.get.mockResolvedValue({ data: { title: 'El Tiempo' } })

    const result = await fetchNationalWeather()

    expect(result.title).toBe('El Tiempo')
    expect(axios.get).toHaveBeenCalledWith('https://api.el-tiempo.net/json/v3/general')
  })

  it('fetches provinces', async () => {
    axios.get.mockResolvedValue({ data: { provincias: [] } })

    const result = await fetchProvinces()

    expect(result.provincias).toEqual([])
    expect(axios.get).toHaveBeenCalledWith('https://api.el-tiempo.net/json/v3/provincias')
  })

  it('fetches municipalities by province', async () => {
    axios.get.mockResolvedValue({ data: { municipios: [] } })

    const result = await fetchMunicipalitiesByProvince('33')

    expect(result.municipios).toEqual([])
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.el-tiempo.net/json/v3/provincias/33/municipios',
    )
  })

  it('fetches municipality weather', async () => {
    axios.get.mockResolvedValue({ data: { municipio: { NOMBRE: 'Gijón' } } })

    const result = await fetchMunicipalityWeather('33', '33024')

    expect(result.municipio.NOMBRE).toBe('Gijón')
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.el-tiempo.net/json/v3/provincias/33/municipios/33024',
    )
  })

  it('fetches Asturias municipalities', async () => {
    axios.get.mockResolvedValue({ data: { municipios: [] } })

    const result = await fetchAsturiasMunicipalities()

    expect(result.municipios).toEqual([])
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.el-tiempo.net/json/v3/provincias/33/municipios',
    )
  })

  it('fetches Asturias municipality weather', async () => {
    axios.get.mockResolvedValue({ data: { municipio: { NOMBRE: 'Oviedo' } } })

    const result = await fetchAsturiasMunicipalityWeather('33044')

    expect(result.municipio.NOMBRE).toBe('Oviedo')
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.el-tiempo.net/json/v3/provincias/33/municipios/33044',
    )
  })
})