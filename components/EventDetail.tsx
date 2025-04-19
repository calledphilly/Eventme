import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { supabase } from '../components/utils/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import MyButton from './MyButton';
import { getDistanceKm } from './utils/distance';
import { Ionicons } from '@expo/vector-icons';

export default function EventDetail() {
	const route = useRoute<RouteProp<{ params: { event: any } }>>();
	const navigation = useNavigation();
	const { event } = route.params;
	const { session } = useAuth();
	const [userLocation, setUserLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

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
			<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
				<Ionicons name="arrow-back" size={24} color="black" />
				<Text style={styles.backText}>Retour</Text>
			</TouchableOpacity>

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
				title="Je participe"
				onPress={handleJoinEvent}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		flex: 1,
		backgroundColor: '#fff',
		rowGap: 40,
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 8,
	},
	backText: {
		fontSize: 16,
	},
	itemLayer: {
		rowGap: 32,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 40,
	},
	date: {
		fontSize: 18,
		lineHeight: 24,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
	},
	premium: {
		color: 'gold',
		fontSize: 16,
		fontWeight: '600',
	},
	distance: {
		fontSize: 16,
		color: '#000',
		lineHeight: 24,
	},
	categoryContainer: {
		backgroundColor: 'black',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
		alignSelf: 'flex-start',
	},
	categoryText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 14,
	},
});
