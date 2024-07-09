import Coords from "./coords.ts";
import Language from "./requests/language.ts";
import {toast} from "react-toastify";
import weatherCommon from "./requests/axios.ts";
import Weather from "./weather/weather.ts";
import Forecast from "./weather/forecast.ts";

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

    async coords(): Promise<Coords> {
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
                    }
                );
            } else {
                toast.error("Geolocation is not supported")
                resolve(WeatherRequests.stdCoords)
            }
        })
    }

    async getWeather(city: string | null = null) {
        const coords = await this.coords()
        const urlCoords = city ? `q=${city}` : `lat=${coords.lat}&lon=${coords.lon}`

        return (await weatherCommon.get(
            `weather?${urlCoords}&units=${this.units}&lang=${this.lang}`
        )).data as Weather
    }

    async getHourlyWeather(city: string | null = null) {
        const coords = await this.coords()
        const urlCoords = city ? `q=${city}` : `lat=${coords.lat}&lon=${coords.lon}`

        return (await weatherCommon.get(
            `forecast?${urlCoords}&units=${this.units}&lang=${this.lang}`
        )).data as Forecast
    }
}

export default WeatherRequests
