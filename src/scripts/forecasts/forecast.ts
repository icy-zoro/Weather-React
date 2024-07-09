import WeatherBase from '../weather/weather_base.ts'
import HourlyForecast from './hourly_forecast.ts'
import Degrees from '../types/degrees.ts'
import Speed from '../types/speed.ts'
import CityApi from '../types/city.ts'

class Forecast {
    private static weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    static readonly dailyHRForecasts = 8

    private static Avg(list: number[]) {
        return list.reduce((a, b) => a + b) / list.length
    }

    private static mostFrequentElem<T>(arr: T[]) {
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length
            - arr.filter(v => v === b).length,
        ).pop() ?? arr[0]
    }

    public readonly list: HourlyForecast[]
    public readonly units: 'standard' | 'metric' | 'imperial'
    public readonly city: CityApi

    public readonly temp_max: number
    public readonly temp_min: number
    public readonly pop: number
    public readonly humidity: number
    public readonly wind: number
    public readonly weatherDescription: string
    public readonly dtDate: Date
    public readonly dayOfWeek: string
    public readonly weatherIcon: string

    constructor({list, city, units = 'standard'}: {
        list: HourlyForecast[],
        city: CityApi,
        units: 'standard' | 'metric' | 'imperial'
    }) {
        this.list = list
        this.city = city
        this.units = units
        this.temp_max = Math.max(...this.list.map(x => x.main.temp_max))
        this.temp_min = Math.min(...this.list.map(x => x.main.temp_min))
        this.pop = Forecast.mostFrequentElem(this.list.map(x => x.pop))
        this.humidity = Forecast.Avg(this.list.map(x => x.main.humidity))
        this.wind = Forecast.Avg(this.list.map(x => x.wind.speed))
        this.weatherDescription = Forecast.mostFrequentElem(this.list.map(x => x.weather.description))
        this.dtDate = WeatherBase.UnixUTCToLocalTime(this.list[0].dt)
        this.dayOfWeek = Forecast.weekdays[this.dtDate.getDay()]
        this.weatherIcon = Forecast.mostFrequentElem(this.list.map(x => x.weather.icon))
    }

    get tempMaxStr(): string {
        const units = Degrees[this.units]
        return `${this.temp_max.toFixed(1)}${units}`
    }

    get tempMinStr(): string {
        const units = Degrees[this.units]
        return `${this.temp_min.toFixed(1)}${units}`
    }

    get precipitationStr(): string {
        return `${this.pop * 100}%`
    }

    get humidityStr(): string {
        return `${this.humidity}%`
    }

    get windStr(): string {
        const units = Speed[this.units]
        return `${this.wind.toFixed(1)} ${units}`
    }
}

export default Forecast
