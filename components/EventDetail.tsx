import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../components/utils/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import MyButton from './MyButton';
import { getDistanceKm } from './utils/distance';

export default function EventDetail() {
	const route = useRoute();
	const navigation = useNavigation();
	const { event } = route.params;
	const { session } = useAuth();
	const [userLocation, setUserLocation] = useState(null);

	useEffect(() => {
		const getLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.warn('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setUserLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
		};

		getLocation();
	}, []);

	const handleJoinEvent = async () => {
		if (!session) {
			Alert.alert('Vous devez être connecté pour participer à un événement.');
			return;
		}

		const { error } = await supabase.from('event_participants').insert([
			{
				user_id: session.user.id,
				event_id: event.id,
				registered_at: new Date().toISOString(),
			},
		]);

		if (error) {
			Alert.alert('Erreur', 'Impossible de vous inscrire à cet événement.');
		} else {
			Alert.alert('Succès', 'Vous êtes inscrit à cet événement !');
			navigation.goBack();
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{event.title}</Text>
			<View style={styles.itemLayer}>
				<Text style={styles.date}>
					📅 {new Date(event.date).toLocaleDateString()}
				</Text>
				<Text style={styles.description}>{event.description}</Text>
				<View style={styles.categoryContainer}>
					<Text style={styles.categoryText}># {event.category}</Text>
				</View>
				{event.is_premium && <Text style={styles.premium}>⭐ Premium</Text>}
				{userLocation && event.latitude && event.longitude && (
					<Text style={styles.distance}>
						📍 À{' '}
						{getDistanceKm(userLocation, {
							latitude: event.latitude,
							longitude: event.longitude,
						}).toFixed(1)}{' '}
						km
					</Text>
				)}
			</View>

			<MyButton
				title='Je participe'
				onPress={handleJoinEvent}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		backgroundColor: '#fff',
	},itemLayer:{rowGap:10},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	date: {
		fontSize: 16,
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		marginBottom: 20,
	},
	premium: {
		color: 'gold',
		marginTop: 10,
	},
	distance: {
		fontSize: 16,
		color: '#000',
	},
	categoryContainer: {
		backgroundColor: 'black',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
		alignSelf: 'flex-start',
	},
	categoryText: {
		color: 'white',
		fontWeight: '700',
	},
});
