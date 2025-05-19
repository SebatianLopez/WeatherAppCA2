import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { useTheme } from '../../context/ThemeContext';


export default function WeatherCard({ weather }: { weather: any }) {
  const [isCelsius, setIsCelsius] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (!weather || !weather.current || !weather.location) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Weather data unavailable.</Text>
      </View>
    );
  }

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const getTemperature = () => {
    const tempC = weather.current.temp_c;
    return isCelsius
      ? `${Math.round(tempC)}°C`
      : `${Math.round(tempC * 9 / 5 + 32)}°F`;
  };

  return (
  <AnimatableView
    animation="fadeInUp"
    duration={600}
    style={[styles.card, { backgroundColor: isDark ? '#1e1e2f' : '#87cefa' }]}
  >
      <Text style={[styles.city, { color: '#fff' }]}>{weather.location.name}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.time}>{formattedTime}</Text>

      <Text style={styles.temp}>{getTemperature()}</Text>
      <Text style={{ color: '#fff', fontSize: 18, opacity: 0.9 }}>
        {weather.current.condition.text}
      </Text>

      <Image
        source={{ uri: `https:${weather.current.condition.icon}` }}
        style={styles.icon}
      />

      {/*Farenheit and Celsious */}
      <View style={styles.toggleWrapper}>
        <Text
          style={styles.toggle}
          onPress={() => setIsCelsius(!isCelsius)}
        >
          Switch to {isCelsius ? '°F' : '°C'}
        </Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>
          Humidity: {weather.current.humidity}%
        </Text>
        <Text style={styles.detailText}>
          Wind: {weather.current.wind_kph} km/h
        </Text>
      </View>

      {/* 🌙 Theme toggle */}
<View style={styles.themeToggleWrapper}>
  <Text style={styles.themeToggle} onPress={toggleTheme}>
  {isDark ? '☀️ Light' : '🌙 Dark'}
  </Text>
</View>
    </AnimatableView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 12,
  },
  details: {
    marginTop: 16,
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  toggleWrapper: {
    marginTop: 16,
    backgroundColor: '#1e3c72',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  toggle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
  },
  date: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
  },
  themeToggle: {
    marginTop: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#ffffff20',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    overflow: 'hidden',
  },
  themeToggleWrapper: {
  position: 'absolute',
  top: 16,
  right: 16,
  zIndex: 10,
},
});




