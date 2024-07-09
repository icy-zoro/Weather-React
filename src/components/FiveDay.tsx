import {useEffect, useState} from "react";
import WeatherRequests from "../scripts/requests.ts";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {useParams} from "react-router-dom";
import DefaultSpinner from "./DefaultSpinner.tsx";
import Forecast from "../scripts/weather/forecast.ts";

export default function Home() {
    const lang = useSelector((state: RootState) => state.language.value)
    const units = useSelector((state: RootState) => state.units.value)
    const requests = new WeatherRequests(lang, units)

    const {city} = useParams()

    const [forecast, setForecast] = useState<Forecast | null>(null)

    useEffect(() => {
        requests.getHourlyWeather(city).then(setForecast)
    }, []);

    if (!forecast) return <DefaultSpinner/>

    return <></>
}
