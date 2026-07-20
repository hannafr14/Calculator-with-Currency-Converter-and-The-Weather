export class WeatherInfo {
    constructor({ title, place, description, stateSky, temperature, maxTemp, minTemp, humidity, wind, updatedAt }) {
        this.title = title
        this.place = place
        this.description = description
        this.stateSky = stateSky
        this.temperature = temperature
        this.maxTemp = maxTemp
        this.minTemp = minTemp
        this.humidity = humidity
        this.wind = wind
        this.updatedAt = updatedAt
    }
}