import Forecast from "../../scripts/weather/forecast.ts";
import HourlyCard from "./HourlyCard.tsx";

export default function HourlyCards({weather}: { weather: Forecast }) {
    return (
        <div className="cards">{
            weather.list.map((hr_forecast, i) => (
                <HourlyCard key={i} hr_forecast={hr_forecast}/>
            ))
        }</div>
    )
}
