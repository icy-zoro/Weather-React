import Coords from "../coords.ts";
import WeatherBase from "./weather_base.ts";

class Weather extends WeatherBase {
    public coord: Coords;
    public timezone: number;

    constructor({
                    clouds,
                    dt,
                    main,
                    sys,
                    timezone,
                    visibility,
                    weather,
                    wind,
                    coord,
                    units,
                }: Weather) {
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

        this.coord = new Coords(coord.lat, coord.lon);
        this.timezone = timezone;
    }
}

export default Weather
