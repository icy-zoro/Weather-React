import React from 'react'
import Weather from '../../scripts/weather/weather.ts'
import WeatherBase from '../../scripts/weather/weather_base.ts'

export default function MainCard({weather} : {weather: Weather}) {
    return (
        <div className='card maincard'>
            <div className='flex flex-col justify-center'>
                <p className='text-lg'>Weather in <strong>{weather.name}</strong>, {weather.sys.country}</p>
                <p className='text-sm'>{weather.dtStr}</p>
                <div className='flex items-center mt-auto'>
                    <span className={`weathericon _${weather.weather.icon}`}></span>
                    <span className='degrees'>{weather.tempStr}</span>
                </div>
            </div>
            <div className='mt-8 lg:mt-0'>
                <p className='text-xl font-bold text-left'>{
                    WeatherBase.Capitalize(weather.weather.description)
                }</p>
                <p className='text-xl'>Feels like:<strong className='ml-4'>{weather.feelsLikeStr}</strong></p>
                <div className='cardgrid mt-8'>
                    {[
                        { label: 'Sunrise:', value: weather.sunriseStr },
                        { label: 'Sunset:', value: weather.sunsetStr },
                        { label: 'Humidity:\u00A0\u00A0', value: weather.humidityStr },
                        { label: 'Wind:', value: weather.speedStr },
                    ].map((item, index) => (
                        <React.Fragment key={index}>
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
