const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const {
  log
} = require('./utils/logger')

const { WEATHER_API_KEY } = process.env
const DEFAULT_CITY = 'campinas'

const fetchWeather = async (city) => {
  log(`Fetching weather for: [${city}]...`)
  try {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    const options = {
      method: 'GET'
    }

    const response = await fetch(endpoint, options)
    const responseText = await response.json()
    saveJson(city, responseText)
  } catch (err) {
    log('Error fetching the weather', err)
  }
}

const saveJson = (city, data) => {
  log(`Saving weather data for: [${city}]...`)
  try {
    fs.writeFileSync(`./public/weather-${city}.json`, JSON.stringify(data))
  } catch (err) {
    log('Error saving the weather', err)
  }
}

const getCities = async () => {
  const result = []
  const filePath = path.join(__dirname, 'data', 'cities.json')

  try {
    const data = await fs.promises.readFile(filePath, 'utf8')
    const { cities } = JSON.parse(data)

    for (const city of cities) {
      result.push(city.name)
    }

    return result
  } catch (err) {
    log(err)
    result.push(DEFAULT_CITY)

    return result
  }
}

const initApp = async () => {
  const cities = await getCities()

  for (const city of cities) {
    await fetchWeather(city)
  }

  log('Finished to run')
}

initApp()
