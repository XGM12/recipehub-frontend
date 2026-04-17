import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import React from 'react';
import "./global.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const RootLayout = () => {
	const queryClient = new QueryClient();

	const [fontsLoaded, error] = useFonts({
		'Chirp-Regular': require('../assets/fonts/Chirp-Regular.ttf'),
		'Chirp-Medium': require('../assets/fonts/Chirp-Medium.ttf'),
		'Chirp-Bold': require('../assets/fonts/Chirp-Bold.ttf'),
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Slot />
		</QueryClientProvider>

	)
}

export default RootLayout