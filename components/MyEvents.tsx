import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { getDistanceKm } from './utils/distance';
import { supabase } from './utils/supabaseClient';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function MyEvents() {
	const [events, setEvents] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showUpcoming, setShowUpcoming] = useState(true);
	const { session } = useAuth();

	async function registerForPushNotificationsAsync() {
		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				console.warn('Permission de notification refusée');
				return false;
			}
			return true;
		}
	}

	useFocusEffect(
		useCallback(() => {
			const fetchLocationAndEvents = async () => {
				setLoading(true);

				await registerForPushNotificationsAsync();

				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					console.warn('Permission localisation refusée');
					setLoading(false);
					return;
				}

				const loc = await Location.getCurrentPositionAsync({});
				const location = {
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
				};
				setUserLocation(location);

				if (!session?.user?.id) {
					setLoading(false);
					return;
				}

				const { data, error } = await supabase
					.from('event_participants')
					.select('events (*)')
					.eq('user_id', session.user.id);

				if (error) {
					console.error('Erreur lors du chargement de vos événements:', error);
					setLoading(false);
					return;
				}

				const now = new Date();

				const enriched = data.map(({ events }) => {
					const eventDate = new Date(events.date);

					// Notification si événement dans < 24h
					if (eventDate.getTime() - now.getTime() > 0 && eventDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
						Notifications.scheduleNotificationAsync({
							content: {
								title: '⏰ Événement à venir !',
								body: `Rappel : "${events.title}" c’est bientôt !`,
							},
							trigger: null, // Envoie immédiate
						});
					}

					if (location && events.latitude && events.longitude) {
						return {
							...events,
							distance: getDistanceKm(location, {
								latitude: events.latitude,
								longitude: events.longitude,
							}),
						};
					}
					return events;
				});

				setEvents(enriched);
				setLoading(false);
			};

			fetchLocationAndEvents();
		}, [session])
	);

	const handleCancelParticipation = async (eventId) => {
		const { error } = await supabase
			.from('event_participants')
			.delete()
			.match({ event_id: eventId, user_id: session.user.id });

		if (!error) {
			setEvents(events.filter((e) => e.id !== eventId));
		} else {
			console.error("Erreur lors de l'annulation :", error);
		}
	};

	const now = new Date();
	const filteredEvents = events.filter((event) => {
		const eventDate = new Date(event.date);
		return showUpcoming ? eventDate >= now : eventDate < now;
	});

	return (
		<View style={styles.container}>
			<Text style={styles.title}>🎫 Mes événements</Text>
			<View style={styles.toggleContainer}>
				<TouchableOpacity
					onPress={() => setShowUpcoming(true)}
					style={[styles.toggle, showUpcoming && styles.activeToggle]}>
					<Text style={showUpcoming ? styles.activeText : styles.inactiveText}>
						📅 À venir
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setShowUpcoming(false)}
					style={[styles.toggle, !showUpcoming && styles.activeToggle]}>
					<Text style={!showUpcoming ? styles.activeText : styles.inactiveText}>
						📜 Passés
					</Text>
				</TouchableOpacity>
			</View>

			{loading ? (
				<ActivityIndicator
					size='large'
					color='#000000'
					style={{ marginTop: 20 }}
				/>
			) : (
				<FlatList
					data={filteredEvents}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.card}>
							<Text style={styles.eventTitle}>{item.title}</Text>
							<Text>{item.description}</Text>
							<Text style={styles.date}>
								📅 {new Date(item.date).toLocaleDateString()}
							</Text>
							{item.distance && (
								<Text style={styles.distance}>
									📍 À {item.distance.toFixed(1)} km de vous
								</Text>
							)}
							{showUpcoming && (
								<TouchableOpacity
									onPress={() => handleCancelParticipation(item.id)}
									style={styles.cancelBtn}>
									<Text style={styles.cancelBtnText}>
										Annuler la participation
									</Text>
								</TouchableOpacity>
							)}
						</View>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: '#fff' },
	title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
	toggleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 16,
	},
	toggle: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		marginHorizontal: 5,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	activeToggle: {
		backgroundColor: '#000000',
		borderColor: '#000000',
	},
	activeText: {
		color: '#fff',
	},
	inactiveText: {
		color: '#000000',
	},
	card: {
		padding: 16,
		backgroundColor: '#fff',
		marginBottom: 12,
		borderRadius: 8,
	},
	eventTitle: { fontSize: 18, fontWeight: 'bold' },
	date: { fontSize: 13, marginTop: 6, color: '#555' },
	distance: { fontSize: 13, marginTop: 6, color: '#333' },
	cancelBtn: {
		marginTop: 10,
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: '#dc3545',
		borderRadius: 6,
		alignSelf: 'flex-start',
	},
	cancelBtnText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
