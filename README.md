## cct students 
Yerick Sebastian Jimenez Pereira 2023289
Dolgion Usukh-Ochir 2023175 

# WeatherAppCA2
Functional code for the WeatherApp
WeatherApp 

A sleek, modern weather app built with React Native + Expo. It fetches real-time weather and 5-day forecasts using the WeatherAPI service. Featuring dark mode, animations, and even local caching. 

# Features 

Search weather by city 

Curent weather  

5-day forecast with icons and temps 

Auto-detect user location (with permission) 

Theme toggle (Dark/Light) 

°C / °F temperature switcher 

Smooth card animations 

Recent searches history with clear button 

Display wind and humidity 

Simple data caching 

# Tech Stack 

React Native (Expo) 

TypeScript 

WeatherAPI.com for weather data 

react-native-animatable for transitions 

AsyncStorage for caching + history 

 

# Setup Instructions 

Clone the repo 

git clone https://github.com/SebatianLopez/WeatherAppCA2  
cd weather-app 

Install dependencies 

npm install 

##Add your API key 

const API_KEY = ' '; 

##Run it 

npx expo start 

 

# Technical Report 

Design & Layout Choices 

We wanted a mobile-first, clean UI. The main weather card is centered with large font for the temperature and minimalist icons. Pastel gradients give a soft, friendly vibe. 

Dark mode adds accessibility and matches user preferences. We placed toggles (theme/°C-°F) within easy thumb reach. 

# Component Structure & Docs 

## WeatherCard.tsx 

Displays current weather data: 

City name 

Date & time 

Temperature (toggleable ℃/℉) 

Weather icon + condition 

Humidity & wind 

Theme + temperature toggles 

## ForecastItem.tsx 

Renders a single day in the forecast list: 

Day name (e.g. "Tuesday") 

High/low temp 

Icon + condition text 

## SearchBar.tsx 

Handles city input and submission: 

Text input with validation 

Search button (calls parent handler) 

Tappable search history 

"Use My Location" button (optional) 

## ThemeContext.tsx 

Simple React Context to manage light/dark mode: 

useTheme() hook to access and toggle theme 

ThemeProvider wraps app root for global access 

ForecastScreen.tsx 

Uses useLocalSearchParams() to get city 

Fetches 5-day forecast via API 

Displays forecast with FlatList + ForecastItem 

## HomeScreen.tsx 

Loads cached weather from AsyncStorage 

Auto-fetches geolocation weather 

Manual search bar with search history 

Shows current weather via WeatherCard 

## weatherApi.ts 

Defines all API integration logic 

Uses axios to fetch data from WeatherAPI endpoints 

Catches errors (rate limit, invalid key, etc.) 

## Exports: 

getWeatherByCity(city: string) 

getWeatherByCoords(lat: number, lon: number) 

getForecastByCity(city: string) 

 

# API & Data Handling 

# API Integration 

Powered by WeatherAPI: 

Current Weather: /current.json?q=city 

Forecast: /forecast.json?q=city&days=5 

Geo coords: /forecast.json?q=lat,lon&days=5 

 

# State Management 

useState() for weather, loading, errors, unit toggles 

useEffect() for geolocation on startup 

Search history saved in AsyncStorage 

Theme managed via ThemeContext (React Context API) 

# Caching Strategy 

Saves last successful weather response in AsyncStorage 

On app open: loads cached weather before fresh request 

 

# Rate Limit Handling 

Catches 429 error from API and shows friendly alert 

Limits frequent re-requests via caching + debounced search 

 

# Code Comments & Structure 

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

State and props are clearly typed with TypeScript 

Animations are commented for clarity (e.g. fadeInUp on weather card) 

 

# Future Improvements 

Hourly forecast 

Saved favorite cities 

Weather map or radar view 

Custom animation per weather condition 

Multi-language support 

 

# Credits 

WeatherAPI.com 

Icons from API 

Built with using Expo + React Native 

 
