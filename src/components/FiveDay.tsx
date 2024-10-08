import {useEffect, useState} from 'react'
import WeatherRequestsWorker from '../scripts/requests/worker.ts'
import {useSelector} from 'react-redux'
import {RootState} from '../state/store.ts'
import {useSearchParams} from 'react-router-dom'
import DefaultSpinner from './DefaultSpinner.tsx'
import Forecast from '../scripts/forecasts/forecast.ts'
import FiveDayCard from './cards/FiveDayCard.tsx'

export default function FiveDay() {
    const lang = useSelector((state: RootState) => state.language.value)
    const units = useSelector((state: RootState) => state.units.value)
    const requests = new WeatherRequestsWorker(lang, units)

    const [searchParams] = useSearchParams()
    const city = searchParams.get('city')

    const [forecast, setForecast] = useState<Forecast[] | null>(null)

    useEffect(() => {
        requests.getHourlyWeather(city).then((x) => {
            const days = []

            let day = null, curdate = null, lastindex = 0
            for (let i = 0; i < x.list.length; i++) {
                curdate = new Date(x.list[i].dt * 1000).getDate()
                if (day === null) {
                    day = curdate
                    continue
                }

                if (day < curdate) {
                    days.push(new Forecast({
                        list: x.list.slice(lastindex, i),
                        city: x.city,
                        units: units,
                    }))
                    day++
                    lastindex = i
                }
            }

            setForecast(days)
        })
    }, [])

    if (!forecast) return <DefaultSpinner/>

    return (
        <div>
            <h2 className='mb-10'>
                Weather in {city ?? forecast[0].city.name} for 5 days
            </h2>
            <div className='cards'>{
                forecast.map((day, i) => <FiveDayCard weather={day} key={i}/>)
            }</div>
        </div>
    )
}
