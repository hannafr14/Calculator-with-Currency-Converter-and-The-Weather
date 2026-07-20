export function createMunicipalitiesDto(data) {
    return {
        municipalities: data.municipios || [],
    }
}

export function createWeatherDto(data) {
    return data
}