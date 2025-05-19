import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import { getWeatherByCity, getWeatherByCoords } from '../../services/weatherApi';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Load cached data first
  useEffect(() => {
    const loadCachedWeather = async () => {
      try {
        const cached = await AsyncStorage.getItem('cachedWeather');
        if (cached) {
          setWeather(JSON.parse(cached));
        }
      } catch (err) {
        console.warn('Failed to load cached weather:', err);
      }
    };

    loadCachedWeather();
    fetchLocationWeather(); //fetch fresh data
  }, []);

  //Auto-fetch weather using device location
  const fetchLocationWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setLoading(true);
      const data = await getWeatherByCoords(latitude, longitude);
      setWeather(data);
      await AsyncStorage.setItem('cachedWeather', JSON.stringify(data)); // cache it

      router.push({
        pathname: '/forecast',
        params: { city: data.location.name },
      });
    } catch (error) {
      console.error('Error fetching location weather:', error);
    } finally {
      setLoading(false);
    }
  };

  //Manual search
  const handleSearch = async (city: string) => {
    if (!city || city.trim().length === 0) {
      Alert.alert('Empty search', 'Please enter a city name.');
      return;
    }

    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      await AsyncStorage.setItem('cachedWeather', JSON.stringify(data)); // cache it too

      router.push({
        pathname: '/forecast',
        params: { city },
      });
    } catch (e) {
      Alert.alert('Error', 'Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#1e3c72', flexGrow: 1 }}>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        weather && <WeatherCard weather={weather} />
      )}
    </ScrollView>
  );
}
