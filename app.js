const axios = require('axios')
require('dotenv').config()

async function fetchWeather(city) {
  try {
    const apiKey = process.env.API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru`

    const res = await axios.get(url)
    const weatherData = res.data
    const Kelvin = weatherData.main.temp
    const Celsius = Math.round(Kelvin - 273)
    const windSpeed = Math.round(weatherData.wind.speed * 10) / 10

    console.log(`Погода в городе ${city}`)
    console.log(`Тип погоды: ${weatherData.weather[0].description}`)
    console.log(`Текущая температура: ${Celsius}°C`)
    console.log(`Скорость ветра: ${windSpeed}м/c`)

  } catch (e) {
    console.error('Ошибка получения данных:', e.message)
  }
}

const city = process.argv[2]

if (!city) {
  console.error('Вы не ввели название города')
  process.exit(1)
}

fetchWeather(city)
console.log('Ищем данные о погоде...')
