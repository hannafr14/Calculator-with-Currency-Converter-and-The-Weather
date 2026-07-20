import {
    fetchAsturiasMunicipalities,
    fetchAsturiasMunicipalityWeather,
    fetchMunicipalitiesByProvince,
    fetchMunicipalityWeather,
    fetchNationalWeather,
    fetchProvinces,
} from '../repositories/weatherRepository'

import { createMunicipalitiesDto, createWeatherDto } from '../dto/weatherDto'
import { mapMunicipalitiesDtoToModel, mapWeatherDtoToModel } from '../mappers/weatherMapper'

export async function getNationalWeather() {
    const rawData = await fetchNationalWeather()
    const dto = createWeatherDto(rawData)

    return mapWeatherDtoToModel(dto)
}

export async function getProvinces() {
    const rawData = await fetchProvinces()

    return rawData.provincias || []
}

export async function getMunicipalitiesByProvince(provinceCode) {
    const rawData = await fetchMunicipalitiesByProvince(provinceCode)
    const dto = createMunicipalitiesDto(rawData)

    return mapMunicipalitiesDtoToModel(dto)
}

export async function getMunicipalityWeather(provinceCode, municipalityId) {
    const rawData = await fetchMunicipalityWeather(provinceCode, municipalityId)
    const dto = createWeatherDto(rawData)

    return mapWeatherDtoToModel(dto)
}

export async function getAsturiasMunicipalities() {
    const rawData = await fetchAsturiasMunicipalities()
    const dto = createMunicipalitiesDto(rawData)

    return mapMunicipalitiesDtoToModel(dto)
}

export async function getAsturiasMunicipalityWeather(municipalityId) {
    const rawData = await fetchAsturiasMunicipalityWeather(municipalityId)
    const dto = createWeatherDto(rawData)

    return mapWeatherDtoToModel(dto)
}