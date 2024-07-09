import Coords from '../coords.ts'

interface CityApi {
    id: number
    name: string
    coord: Coords
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

export default CityApi
