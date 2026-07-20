import { Municipality } from '../models/municipality'
import { WeatherInfo } from '../models/weatherInfo'

export function mapMunicipalitiesDtoToModel(dto) {
    return dto.municipalities.map((municipality) => {
        const id = municipality.CODIGOINE?.slice(0, 5) || municipality.id
        const name = municipality.NOMBRE || municipality.name

        return new Municipality(id, name)
    })
}

export function mapWeatherDtoToModel(dto) {
    const stateSkyDescription = dto.stateSky?.description || 'Sin datos'

    return new WeatherInfo({
        title: dto.title || 'El Tiempo',
        place: dto.municipio?.NOMBRE || dto.nombre || 'Asturias',
        description: stateSkyDescription,
        stateSky: stateSkyDescription,
        temperature: dto.temperatura_actual || '--',
        maxTemp: dto.temperaturas?.max || '--',
        minTemp: dto.temperaturas?.min || '--',
        humidity: dto.humedad ? `${dto.humedad}%` : '--',
        wind: dto.viento ? `${dto.viento} km/h` : '--',
        updatedAt: dto.elaborado || dto.fecha || '',
    })
}