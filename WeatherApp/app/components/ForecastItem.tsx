import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ForecastItem({ item }: { item: any }) {
  //Format the date into a day name like "Sat"
  const date = new Date(item.date);
  const dayName = date.toLocaleDateString('en-US', {
    weekday: 'short', 
  });

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{dayName}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.temp}>
          {item.day.maxtemp_c.toFixed(1)}° / {item.day.mintemp_c.toFixed(1)}°
        </Text>
        <Text style={styles.condition}>{item.day.condition.text}</Text>
        <Image
          source={{ uri: `https:${item.day.condition.icon}` }}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a5298',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temp: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  condition: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    width: 48,
    height: 48,
  },
});
