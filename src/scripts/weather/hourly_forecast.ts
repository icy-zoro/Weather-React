import WeatherBase from "./weather_base.ts";

class HourlyForecast extends WeatherBase {
    public readonly pop: number;

    constructor({
                    clouds,
                    dt,
                    main,
                    sys,
                    visibility,
                    weather,
                    wind,
                    pop,
                    units
                }: HourlyForecast) {
        super({
            clouds,
            dt,
            main,
            sys,
            units: units ? units : 'standard',
            visibility,
            weather,
            wind
        });
        this.pop = pop;
    }

    get dtStr() {
        return WeatherBase.DateStrNormalize(this.dt);
    }

    get timeStr() {
        return WeatherBase.DateToTime(this.dt);
    }
}

export default HourlyForecast
