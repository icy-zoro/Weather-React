import Forecast from '../../scripts/forecasts/forecast.ts'
import WeatherBase from '../../scripts/weather/weather_base.ts'

export default function FiveDayCard({weather}: {weather: Forecast}) {
    return (
        <div className='card sm-card five-day-card'>
            <div className='flex flex-col justify-center'>
                <span className='text-xl font-medium'>
                    {weather.dayOfWeek},&nbsp;
                    {weather.dtDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                </span>
                <span className='text-3xl font-bold text-left'>
                    {WeatherBase.Capitalize(weather.weatherDescription)}
                </span>
                <div className='flex items-center mt-auto'>
                    <span className={`weather-icon _${weather.weatherIcon}`}></span>
                    <span className='degrees ml-6'>
                        {weather.tempMaxStr} / {weather.tempMinStr}
                    </span>
                </div>
            </div>
            <div className='card-grid'>
                <span>Humidity:  </span>
                <strong>{weather.humidityStr}</strong>
                <span>Wind: </span>
                <strong>{weather.windStr}</strong>
                <span>Precipitation: </span>
                <strong>{weather.precipitationStr}</strong>
            </div>
        </div>
    )
}
