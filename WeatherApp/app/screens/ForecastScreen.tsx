import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getForecastByCity } from '../../services/weatherApi';
import ForecastItem from '../components/ForecastItem';
import WeatherCard from '../components/WeatherCard'; // ✅ for current weather

export default function ForecastScreen() {
  const { city } = useLocalSearchParams();
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city || typeof city !== 'string') {
      Alert.alert('Missing City', 'No city was provided.');
      return;
    }

    const fetchForecast = async () => {
      setLoading(true);
      try {
        const data = await getForecastByCity(city);
        setForecast(data.forecast.forecastday);
        setCurrentWeather(data); // ✅ store full current weather data
      } catch (e) {
        Alert.alert('Error', 'Could not fetch forecast');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (!city || typeof city !== 'string') {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No city provided</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            currentWeather && (
              <WeatherCard weather={currentWeather} /> // ✅ top card
            )
          }
          data={forecast}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ForecastItem item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
    padding: 20,
  },
  list: {
    paddingBottom: 20,
    gap: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e3c72',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
});

