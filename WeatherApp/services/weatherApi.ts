import axios from 'axios';

const API_KEY = 'd3c422a800bb4ac3ba1150817251305';
const BASE_URL = 'http://api.weatherapi.com/v1';

export const getWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 5,
      },
    });
    return res.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

export const getWeatherByCity = async (city: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });
    return res.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

export const getForecastByCity = async (city: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,
      },
    });
    return res.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// 💥 Error handler
const handleApiError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 429) {
      alert('Rate limit reached. Please wait a moment and try again.');
    } else if (status === 403 || status === 401) {
      alert('Invalid or missing API key.');
    } else if (data?.error?.message) {
      alert(`WeatherAPI Error: ${data.error.message}`);
    } else {
      alert('Something went wrong with the weather service.');
    }
  } else {
    alert('Network error. Please check your connection.');
  }
};

