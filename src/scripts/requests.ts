import Coords from "./coords.ts";
import Language from "./requests/language.ts";
import {toast} from "react-toastify";
import weatherCommon from "./requests/axios.ts";
import Weather from "./weather/weather.ts";
import Forecast from "./weather/forecast.ts";
import HourlyForecast from "./weather/hourly_forecast.ts";

class WeatherRequests {
    private static readonly stdCoords = new Coords(49.842957, 24.031111);

    public static readonly languages = Object.keys(Language)
    public static readonly languageCodes = Object.values(Language);

    public lang: Language;

    public units: 'standard' | 'metric' | 'imperial'

    constructor(
        lang: Language,
        units: 'standard' | 'metric' | 'imperial',
    ) {
        this.lang = lang;
        this.units = units;
    }

    public async coords(): Promise<Coords> {
        return await new Promise(resolve => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const coords = new Coords(position.coords.latitude, position.coords.longitude);
                        resolve(coords);
                    },
                    error => {
                        console.error(error);
                        toast.error("Can't get your location")
                        resolve(WeatherRequests.stdCoords)
                    },
                );
            } else {
                toast.error("Geolocation is not supported")
                resolve(WeatherRequests.stdCoords)
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
            list: forecast.list.map((x: any) => new HourlyForecast(x))
        } as Forecast
    }
}

export default WeatherRequests
