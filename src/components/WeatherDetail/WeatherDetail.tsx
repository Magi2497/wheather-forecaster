import { formatTemperature } from '../../helpers'
import type { Weather } from '../../hooks/useWeather'

type WeatherDetailProps = {
  weather: Weather
}

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div>
      <h2>Weather form: {weather.name}</h2>
      <p className="">{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className="">
        Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
        Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span>
      </div>
    </div>
  )
}
