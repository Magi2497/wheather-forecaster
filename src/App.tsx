import styles from './App.module.css'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'
import Alert from './components/Alert/Alert'
function App() {
  const { fetchWeather, weather, loading, notFound } = useWeather()

  return (
    <>
      <h1 className={styles.title}>buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        {loading && <Spinner />}

        {weather.name && <WeatherDetail weather={weather} />}
        {notFound && <Alert>City not found</Alert>}
      </div>
    </>
  )
}

export default App
