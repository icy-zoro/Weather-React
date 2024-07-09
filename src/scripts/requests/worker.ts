import Coords from '../coords.ts'
import Language from './language.ts'
import {toast} from 'react-toastify'
import weatherCommon from './axios.ts'
import Weather from '../weather/weather.ts'
import Forecast from '../forecasts/forecast.ts'
import HourlyForecast from '../forecasts/hourly_forecast.ts'

class WeatherRequestsWorker {
    private static readonly stdCoords = new Coords(49.842957, 24.031111)

    public static readonly languages = Object.keys(Language)
    public static readonly languageCodes = Object.values(Language)

    public lang: Language

    public units: 'standard' | 'metric' | 'imperial'

    constructor(
        lang: Language,
        units: 'standard' | 'metric' | 'imperial',
    ) {
        this.lang = lang
        this.units = units
    }

    public async coords(): Promise<Coords> {
        return await new Promise(resolve => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const coords = new Coords(position.coords.latitude, position.coords.longitude)
                        resolve(coords)
                    },
                    () => {
                        toast.error(`Can't get your location`)
                        resolve(WeatherRequestsWorker.stdCoords)
                    },
                )
            } else {
                toast.error('Geolocation is not supported')
                resolve(WeatherRequestsWorker.stdCoords)
            }
        })
    }

    public async getWeather(city: string | null = null) {
        const coords = await this.coords()
        const urlCoords = city ? `q=${city}` : `lat=${coords.lat}&lon=${coords.lon}`

        return new Weather((await weatherCommon.get(`weather?${urlCoords}`,
            {
                params: {
                    units: this.units,
                    lang: this.lang,
                },
            },
        )).data)
    }

    public async getHourlyWeather(city: string | null = null) {
        const coords = await this.coords()
        const urlCoords = city ? `q=${city}` : `lat=${coords.lat}&lon=${coords.lon}`
        const forecast = new Forecast((await weatherCommon.get(`forecast?${urlCoords}`, {
                params: {
                    units: this.units,
                    lang: this.lang,
                },
            },
        )).data)

        return {
            ...forecast,
            list: forecast.list.map((x: HourlyForecast) => new HourlyForecast(x))
        } as Forecast
    }
}

export default WeatherRequestsWorker
