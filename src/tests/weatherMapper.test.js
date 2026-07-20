import { describe, expect, it } from 'vitest'
import { mapMunicipalitiesDtoToModel, mapWeatherDtoToModel } from '../mappers/weatherMapper'

describe('weatherMapper', () => {
  it('maps municipalities dto to municipality models', () => {
    const dto = {
      municipalities: [
        {
          CODIGOINE: '33001000000',
          NOMBRE: 'Allande',
        },
        {
          CODIGOINE: '33024000000',
          NOMBRE: 'Gijón',
        },
      ],
    }

    const municipalities = mapMunicipalitiesDtoToModel(dto)

    expect(municipalities).toHaveLength(2)
    expect(municipalities[0].id).toBe('33001')
    expect(municipalities[0].name).toBe('Allande')
    expect(municipalities[1].id).toBe('33024')
    expect(municipalities[1].name).toBe('Gijón')
  })

  it('maps weather dto to weather model', () => {
    const dto = {
      title: 'El Tiempo',
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
      elaborado: '2026-07-20 07:13:09',
    }

    const weather = mapWeatherDtoToModel(dto)

    expect(weather.title).toBe('El Tiempo')
    expect(weather.place).toBe('Oviedo')
    expect(weather.description).toBe('Nuboso')
    expect(weather.stateSky).toBe('Nuboso')
    expect(weather.temperature).toBe('19')
    expect(weather.maxTemp).toBe('24')
    expect(weather.minTemp).toBe('15')
    expect(weather.humidity).toBe('84%')
    expect(weather.wind).toBe('7 km/h')
    expect(weather.updatedAt).toBe('2026-07-20 07:13:09')
  })

  it('uses fallback values when weather dto is incomplete', () => {
    const weather = mapWeatherDtoToModel({})

    expect(weather.title).toBe('El Tiempo')
    expect(weather.place).toBe('Asturias')
    expect(weather.description).toBe('Sin datos')
    expect(weather.stateSky).toBe('Sin datos')
    expect(weather.temperature).toBe('--')
    expect(weather.maxTemp).toBe('--')
    expect(weather.minTemp).toBe('--')
    expect(weather.humidity).toBe('--')
    expect(weather.wind).toBe('--')
    expect(weather.updatedAt).toBe('')
  })
})