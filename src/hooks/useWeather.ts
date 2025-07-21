import { useState } from 'react'
import axios from 'axios'
import z from 'zod'
// import { object, string, number, InferOutput, parse } from 'valibot'
import type { SearchType } from '../types'

// type guard or assertion
// function isWheaterResponse(weather: unknown): weather is Weather {
//   const w = weather as Weather

//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof w.name === 'string' &&
//     typeof w.main.temp === 'number' &&
//     typeof w.main.temp_max === 'number' &&
//     typeof w.main.temp_min === 'number'
//   )
// }

// Zod

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
})

export type Weather = z.infer<typeof Weather>

// Valibot

// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// })

// type Weather = InferOutput<typeof WeatherSchema>

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    name: '',
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    },
  })

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
      // const { data: weatherResult } = await axios(weatherUrl)
      // const result = isWheaterResponse(weatherResult)

      // if (result) {
      //   console.log(weatherResult.name)
      // }

      // Zod
      const { data: weatherResult } = await axios(weatherUrl)
      const result = Weather.safeParse(weatherResult)

      if (result.success) {
        setWeather(result.data)
      }

      // Valibot
      // const { data: weatherResult } = await axios(weatherUrl)
      // const result = parse(WeatherSchema, weatherResult)

      // if (result) {
      //   console.log(result.name)
      // }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchWeather,
    weather,
  }
}
