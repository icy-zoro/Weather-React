import WeatherBase from '../weather/weather_base.ts'

class HourlyForecast extends WeatherBase {
    public readonly pop: number

    constructor(hr: HourlyForecast & { pop: number }) {
        super({
            ...hr,
            units: hr.units ? hr.units : 'standard',
        })
        this.pop = hr.pop
    }

    get dtStr() {
        return WeatherBase.DateStrNormalize(this.dt)
    }

    get timeStr() {
        return WeatherBase.DateToTime(this.dt)
    }

    get precipitationStr() {
        return `${this.pop * 100}%`
    }
}

export default HourlyForecast
