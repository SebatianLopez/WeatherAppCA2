import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeSearchHistory = async (city: string[]) => {
  try {
    await AsyncStorage.setItem('searchHistory', JSON.stringify(city));
  } catch (e) {
    console.error('Failed to save search history');
  }
};

export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (e) {
    return [];
  }
};

export const clearSearchHistory = async () => {
  await AsyncStorage.removeItem('searchHistory');
};
