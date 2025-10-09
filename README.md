## cct students 
Yerick Sebastian Jimenez Pereira 2023289
Dolgion Usukh-Ochir 2023175 

# 🌦️WeatherAppCA2
A sleek, modern Weather App built with React Native + Expo.
It fetches real-time weather and 5-day forecasts using WeatherAPI — complete with dark mode, smooth animations, and local caching!

# ✨Features 

✅ Search weather by city
🌍 Auto-detect user location (with permission)
🌡️ Toggle °C / °F
🌙 Theme switcher (Dark / Light)
📅 5-day forecast with icons & temps
💨 Wind & 💧Humidity display
🧠 Simple data caching for faster reloads
🔍 Recent searches history (with clear button)
💫 Smooth card animations

# 🧰Tech Stack 

⚛️ React Native (Expo)

🟦 TypeScript

☁️ WeatherAPI.com for weather data

🎞️ react-native-animatable for transitions

💾 AsyncStorage for caching & history

 

# ⚙️Setup Instructions 

## 1. Clone the repo 

git clone https://github.com/SebatianLopez/WeatherAppCA2  
cd weather-app 

## 2. Install dependencies 

npm install 

## 3. Add your API key 🔑

const API_KEY = ' '; 

## Run the app 🚀 

npx expo start 

 

# Design & Layout Choices

We aimed for a mobile-first, clean UI — the main weather card is centered with a large temperature font and minimalist icons 🌤️.
Pastel gradients and dark mode make it friendly, modern, and accessible.

Toggles (theme + °C/°F) are placed within easy thumb reach for better usability

## 🧩 Component Overview

## 🌤️ WeatherCard.tsx

Displays current weather data:

City name, date & time

Temperature (°C/°F toggle)

Condition icon + text

Wind + humidity

Theme + unit toggles

## 📆 ForecastItem.tsx

Each card shows:

Day name (e.g., “Tuesday”)

High / low temperature

Icon + weather condition

## 🔎 SearchBar.tsx

Handles city input and interactions:

Input validation

Search button (calls parent handler)

Search history (tappable)

“Use My Location” option 

## 🌗 ThemeContext.tsx

Manages app theme with React Context API:

useTheme() hook to access / toggle mode

ThemeProvider wraps the app globally

## 📱 ForecastScreen.tsx

Fetches 5-day forecast from API

Uses FlatList to render daily forecasts

Supports city lookup via route parameters

## 🏠 HomeScreen.tsx

Loads cached weather data on startup

Fetches geolocation-based weather

Displays current weather via WeatherCard

Includes recent search history

## ☁️ weatherApi.ts

Handles all API logic (via Axios):

getWeatherByCity(city)

getWeatherByCoords(lat, lon)

getForecastByCity(city)
Includes error handling for rate limits & invalid keys 🧩

## Exports: 

getWeatherByCity(city: string) 

getWeatherByCoords(lat: number, lon: number) 

getForecastByCity(city: string) 

 

# 🔄 API & Data Handling

# Endpoints used (WeatherAPI):

/current.json?q=city → Current weather

/forecast.json?q=city&days=5 → 5-day forecast

/forecast.json?q=lat,lon&days=5 → Location-based

 

# 🧠 State Management

useState() for data, loading, and toggles

useEffect() for auto-fetch on app start

AsyncStorage for search history & cache

Theme handled with ThemeContext

# 💾 Caching Strategy

Stores the last successful weather response locally

Loads cached data before fetching new info

Reduces API calls & improves load speed 🚀 

 

# 🚨 Rate Limit Handling

Detects API 429 (Too Many Requests)

Displays user-friendly alerts instead of breaking 

Uses caching + debounced search to avoid spam requests 

 

## 🧱 Code Quality & Structure

# 🧩 Modular folder structure: 

Major components and functions are documented with inline comments 

Functions are broken into small, readable pieces 

Project uses clear naming conventions and a modular folder structure: 

/components
  WeatherCard.tsx
  ForecastItem.tsx
  SearchBar.tsx
/hooks
  useColorScheme.ts
/context
  ThemeContext.tsx
/services
  weatherApi.ts
/constants
  Colors.ts

Well-commented & typed with TypeScript

Consistent naming & modular functions

Readable, maintainable, and beginner-friendly  

 

# 🌈 Future Improvements

🕐 Hourly forecast
⭐ Favorite cities
🗺️ Weather map / radar view
🌦️ Custom animations per weather condition
🌍 Multi-language support 

 

# Credits

☁️ WeatherAPI.com

🎨 Icons from WeatherAPI

🚀 Built with Expo + React Native

 
