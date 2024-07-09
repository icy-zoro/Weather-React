import Degrees from "./degrees.ts";
import Speed from "./speed.ts";

interface ApiWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface ApiWind {
    speed: number;
    deg: number;
    gust: number;
}

interface ApiMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
}

interface ApiSys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

class WeatherBase {
    private static _pressureUnits = ' hPa';

    public clouds: number;
    public dt: number;
    public main: ApiMain;
    public sys: ApiSys;
    public units: "standard" | "metric" | "imperial";
    public visibility: string;
    public weather: ApiWeather;
    public wind: ApiWind;

    constructor({
                    clouds,
                    dt,
                    main,
                    sys,
                    units,
                    visibility,
                    weather,
                    wind
    }: {
        clouds: number | {
            all: number
        },
        dt: number,
        main: ApiMain,
        sys: ApiSys,
        units: "standard" | "metric" | "imperial",
        visibility: string,
        weather: ApiWeather | ApiWeather[],
        wind: ApiWind
    }) {
        this.dt = dt;
        this.main = main;
        this.sys = sys;
        this.units = units;
        this.visibility = visibility;
        this.wind = wind;
        this.clouds = typeof clouds === "number" ? clouds : clouds.all
        this.weather = Array.isArray(weather) ? weather[0] : weather;
    }

    static get pressureUnits() {
        return this._pressureUnits;
    }

    static DateStrNormalize(unixDate: number) {
        return WeatherBase
            .UnixUTCToLocalTime(unixDate)
            .toLocaleString('en-US', {
                dateStyle: "medium",
                timeStyle: "short",
                hour12: true,
            });
    }

    static DateToTime(unixDate: number) {
        return WeatherBase
            .UnixUTCToLocalTime(unixDate)
            .toLocaleTimeString('en-US', {timeStyle: 'short'});
    }

    static Capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static UnixUTCToLocalTime(unixUtcTime: number) {
        // const date = new Date(unixUtcTime * 1000);
        // const offsetMs = date.getTimezoneOffset() * 60 * 1000;
        // const localDate = new Date(date.getTime() - offsetMs);
        // return localDate;
        // return date;

        return new Date(unixUtcTime * 1000);
    }

    get tempStr(): string {
        const tempUnits = Degrees[this.units]
        return this.main.temp.toFixed() + tempUnits;
    }

    get tempMaxStr(): string {
        const tempUnits = Degrees[this.units]
        return this.main.temp_max.toFixed() + tempUnits;
    }

    get tempMinStr(): string {
        const tempUnits = Degrees[this.units]
        return this.main.temp_min.toFixed() + tempUnits;
    }

    get feelsLikeStr(): string {
        const tempUnits = Degrees[this.units]
        return this.main.feels_like.toFixed() + tempUnits;
    }

    get pressureStr(): string {
        return this.main.pressure.toFixed() + WeatherBase.pressureUnits;
    }

    get seaLevelStr(): string {
        return this.main.sea_level.toFixed() + WeatherBase.pressureUnits;
    }

    get groundLevelStr(): string {
        return this.main.grnd_level.toFixed() + WeatherBase.pressureUnits;
    }

    get speedStr(): string {
        const speedUnits = Speed[this.units];
        return this.wind.speed.toFixed() + ' ' + speedUnits;
    }

    get gustStr(): string {
        const speedUnits = Speed[this.units];
        return this.wind.gust.toFixed() + ' ' + speedUnits;
    }

    get degStr(): string {
        return this.wind.deg + '°';
    }

    get cloudsStr(): string {
        return this.clouds + '%';
    }

    get humidityStr(): string {
        return this.main.humidity + '%';
    }
}

export default WeatherBase
