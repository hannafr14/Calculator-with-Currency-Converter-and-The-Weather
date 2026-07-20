import {
    getAsturiasMunicipalities,
    getAsturiasMunicipalityWeather,
    getMunicipalitiesByProvince,
    getMunicipalityWeather,
    getNationalWeather,
    getProvinces,
} from '../services/weatherService'

export async function handleNationalWeatherRequest() {
    return await getNationalWeather()
}

export async function handleProvincesRequest() {
    return await getProvinces()
}

export async function handleMunicipalitiesByProvinceRequest(provinceCode) {
    if (!provinceCode) {
        throw new Error('Selecciona una provincia')
    }

    return await getMunicipalitiesByProvince(provinceCode)
}

export async function handleMunicipalityWeatherRequest(provinceCode, municipalityId) {
    if (!provinceCode) {
        throw new Error('Selecciona una provincia')
    }

  if (!municipalityId) {
        throw new Error('Selecciona un municipio')
    }

    return await getMunicipalityWeather(provinceCode, municipalityId)
}

export async function handleAsturiasMunicipalitiesRequest() {
    return await getAsturiasMunicipalities()
}

export async function handleAsturiasMunicipalityWeatherRequest(municipalityId) {
    if (!municipalityId) {
        throw new Error('Selecciona un municipio')
}

return await getAsturiasMunicipalityWeather(municipalityId)
}
