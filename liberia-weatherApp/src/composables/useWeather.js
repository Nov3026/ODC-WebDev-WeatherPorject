import { ref } from 'vue'

export function useWeather() {
  const searchQuery = ref('')
  const weatherData = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function searchCity() {
    const city = searchQuery.value.trim()
    if (!city) return

    loading.value = true
    error.value = ''
    weatherData.value = null

    try {
      // Get coordinates + country code
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      )
      const geoData = await geo.json()
      if (!geoData.results?.[0]) throw new Error('City not found')

      const place = geoData.results[0]

      // Get current + 7-day weather in ONE call
      const weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      )
      const wData = await weather.json()

      weatherData.value = {
        location: `${place.name}, ${place.country}`,
        countryCode: (place.country_code || 'un').toLowerCase(),
        latitude: place.latitude,
        longitude: place.longitude,
        temperature: wData.current.temperature_2m,
        feelsLike: wData.current.apparent_temperature,
        humidity: wData.current.relative_humidity_2m,
        wind: wData.current.wind_speed_10m,
        description: ['Clear sky','Mainly clear','Partly cloudy','Overcast','Fog','Drizzle','Rain','Heavy rain','Snow','Thunderstorm'][wData.current.weather_code] || 'Cloudy',
        daily: wData.daily
      }
    } catch (e) {
      error.value = 'City not found or network error'
    } finally {
      loading.value = false
    }
  }

  return { searchQuery, weatherData, loading, error, searchCity }
}