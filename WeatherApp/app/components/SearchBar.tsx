import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  //Use current location
  const handleLocationSearch = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'We need your permission to access location');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  try {
    // Call a new prop to handle latitude/longitude search
    onSearch(`${latitude},${longitude}`);
  } catch (error) {
    Alert.alert('Error', 'Could not fetch weather for your location');
  }
};


  // Load search history on startup
  useEffect(() => {
    const loadHistory = async () => {
      const saved = await AsyncStorage.getItem('searchHistory');
      if (saved) setHistory(JSON.parse(saved));
    };
    loadHistory();
  }, []);

  // Save search and update history
  const handleSearch = async () => {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      Alert.alert('Empty Search', 'Please enter a city name.');
      return;
    }

    const newHistory = [trimmed, ...history.filter(item => item !== trimmed)].slice(0, 5);
    setHistory(newHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));

    onSearch(trimmed);
  };

  // Tap history item
  const handleHistoryPress = async (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  // Clear history
  const handleClearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#1e3c72"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <Button title="Search" onPress={handleSearch} />
      <Button title="📍 Use My Location" onPress={handleLocationSearch} />


      {/*Search history */}
      {history.length > 0 && (
        <View style={styles.historyWrapper}>
          <Text style={styles.historyTitle}>Recent:</Text>
          <View style={styles.historyList}>
            {history.map((city, index) => (
              <Text
                key={index}
                style={styles.historyItem}
                onPress={() => handleHistoryPress(city)}
              >
                {city}
              </Text>
            ))}
          </View>
          <Text style={styles.clearButton} onPress={handleClearHistory}>
            Clear History
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#e0f7ff',
    color: '#1e3c72',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyWrapper: {
    marginTop: 16,
  },
  historyTitle: {
    color: '#1e3c72',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  historyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  historyItem: {
    backgroundColor: '#d6ecff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    fontSize: 14,
    color: '#1e3c72',
    marginRight: 8,
    marginBottom: 8,
  },
 clearButton: {
  marginTop: 10,
  paddingVertical: 6,
  paddingHorizontal: 14,
  alignSelf: 'flex-end',
  backgroundColor: '#87CEFA', 
  color: '#fff', 
  fontSize: 14,
  borderRadius: 16,
  overflow: 'hidden', 
  textAlign: 'center',
},
});


