import Weather from "../scripts/weather/weather.ts";
import {useEffect, useState} from "react";
import WeatherRequests from "../scripts/requests.ts";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {useSearchParams} from "react-router-dom";
import DefaultSpinner from "./DefaultSpinner.tsx";
import Forecast from "../scripts/weather/forecast.ts";
import MainCard from "./cards/MainCard.tsx";
import HourlyCards from "./cards/HourlyCards.tsx";

export default function Home() {
    const lang = useSelector((state: RootState) => state.language.value)
    const units = useSelector((state: RootState) => state.units.value)
    const requests = new WeatherRequests(lang, units)

    const [searchParams] = useSearchParams()
    const city = searchParams.get('city')

    const [forecast, setForecast] = useState<Weather | null>(null)
    const [hourlyForecast, setHourlyForecast] = useState<Forecast | null>(null)

    useEffect(() => {
        requests.getWeather(city).then((x) => {
            x.units = units
            setForecast(x)
        })
        requests.getHourlyWeather(city).then((x) => {
            x.list.forEach((y) => y.units = units)
            setHourlyForecast(x)
        })
    }, []);

    if (!forecast || !hourlyForecast) return <DefaultSpinner/>

    return (
        <div className="home">
            <MainCard weather={forecast}/>
            <h2>Hourly forecast</h2>
            <HourlyCards weather={hourlyForecast}/>
        </div>
    )
}
