import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext';

export default function Layout() {
  const scheme = useColorScheme(); 

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: scheme === 'dark' ? '#000' : '#fff', 
          },
          headerTintColor: scheme === 'dark' ? '#fff' : '#000', 
        }}
      >
        <Stack.Screen name="index" options={{ title: 'My Forecats' }} /> 
      </Stack>
    </ThemeProvider>
  );
}


