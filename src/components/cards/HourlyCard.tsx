import HourlyForecast from '../../scripts/forecasts/hourly_forecast.ts'

export default function HourlyCard({hr_forecast} : {hr_forecast: HourlyForecast}) {
    return (
        <div className='card smcard'>
            <div className='flex flex-col justify-center'>
                <span className={`block weathericon _${hr_forecast.weather.icon}`}></span>
                <span className='block degrees'>{hr_forecast.tempMaxStr}</span>
                <strong className='ml-1'>{hr_forecast.timeStr}</strong>
            </div>
            <div className='cardgrid'>
                <span>Humidity:  </span>
                <strong>{hr_forecast.humidityStr}</strong>
                <span>Wind: </span>
                <strong>{hr_forecast.speedStr}</strong>
                <span>Precipitation: </span>
                <strong>{hr_forecast.precipitationStr}</strong>
            </div>
        </div>
    )
}
