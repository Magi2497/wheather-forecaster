import axios from 'axios'
import type { SearchType, Weather } from '../types'

// type guard or assertion
function isWheaterResponse(weather: unknown): weather is Weather {
  const w = weather as Weather

  return (
    Boolean(weather) &&
    typeof weather === 'object' &&
    typeof w.name === 'string' &&
    typeof w.main.temp === 'number' &&
    typeof w.main.temp_max === 'number' &&
    typeof w.main.temp_min === 'number'
  )
}

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

      const { data } = await axios(geoUrl)

      const lat = data[0].lat
      const lon = data[0].lon

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

      // Cast type
      // const { data: weatherResult } = await axios<Weather>(weatherUrl)
      // console.log(weatherResult.main.temp_max)
      // console.log(weatherResult.name)

      // Type Guards
      const { data: weatherResult } = await axios(weatherUrl)
      const result = isWheaterResponse(weatherResult)

      if (result) {
        console.log(weatherResult.name)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchWeather,
  }
}
