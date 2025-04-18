import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { supabase } from '../components/utils/supabaseClient';
import MyInput from './MyInput';
import { getDistanceKm } from './utils/distance';

interface Event {
	id: number;
	title: string;
	description: string;
	category: string;
	is_premium: boolean;
	latitude: number;
	longitude: number;
	date: string;
}

type RootStackParamList = {
	EventDetail: { event: Event };
};

export default function EventList() {
	const [events, setEvents] = useState<Event[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState('Tous');
	const [searchQuery, setSearchQuery] = useState('');
	const [userLocation, setUserLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [showFreeEvents, setShowFreeEvents] = useState(true);
	const [showPremiumEvents, setShowPremiumEvents] = useState(true);

	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

	useEffect(() => {
		const fetchCategories = async () => {
			const { data, error } = await supabase
				.from('events_with_coords')
				.select('category');

			if (error) {
				console.error('Erreur lors de la récupération des catégories:', error);
			} else {
				const uniqueCategories = [
					'Tous',
					...new Set(data.map((item) => item.category)),
				];
				setCategories(uniqueCategories);
			}
		};

		const fetchEvents = async () => {
			let query = supabase.from('events_with_coords').select('*');

			if (selectedCategory !== 'Tous') {
				query = query.eq('category', selectedCategory);
			}

			if (searchQuery) {
				query = query.ilike('title', `%${searchQuery}%`);
			}

			const { data, error } = await query;

			if (error) {
				console.error('Erreur lors de la récupération des événements:', error);
			} else {
				let filteredEvents = data.filter((event) => {
					if (!showFreeEvents && !event.is_premium) return false;
					if (!showPremiumEvents && event.is_premium) return false;
					return true;
				});

				if (userLocation) {
					filteredEvents = [...filteredEvents].sort((a, b) => {
						const distA = getDistanceKm(userLocation, {
							latitude: a.latitude,
							longitude: a.longitude,
						});
						const distB = getDistanceKm(userLocation, {
							latitude: b.latitude,
							longitude: b.longitude,
						});
						return distA - distB;
					});
				}

				setEvents(filteredEvents);
			}
		};

		fetchCategories();
		fetchEvents();
	}, [
		selectedCategory,
		searchQuery,
		userLocation,
		showFreeEvents,
		showPremiumEvents,
	]);

	const handleEventPress = (event: Event) => {
		navigation.navigate('EventDetail', { event });
	};

	return (
		<View style={styles.container}>
			<MyInput
				placeholder='🔍 Rechercher par titre...'
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			<Picker
				selectedValue={selectedCategory}
				style={[styles.picker, { color: '#000000' }]}
				itemStyle={{ color: '#000000' }}
				onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
				{categories.map((category) => (
					<Picker.Item
						key={category}
						label={category}
						value={category}
						color='#000000'
					/>
				))}
			</Picker>

			<View style={styles.filterContainer}>
				<TouchableOpacity
					style={styles.checkboxContainer}
					onPress={() => setShowFreeEvents(!showFreeEvents)}>
					<Text style={styles.checkbox}>
						{showFreeEvents ? '☑' : '☐'} Événements gratuits
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.checkboxContainer}
					onPress={() => setShowPremiumEvents(!showPremiumEvents)}>
					<Text style={styles.checkbox}>
						{showPremiumEvents ? '☑' : '☐'} Événements premium
					</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={events}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => handleEventPress(item)}
						style={styles.card}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.description}>{item.description}</Text>
						<Text style={styles.category}>Catégorie: {item.category}</Text>

						{item.is_premium ? (
							<Text style={styles.premiumBadge}>🌟 Événement Premium</Text>
						) : (
							<Text style={styles.freeBadge}>🎉 Événement Gratuit</Text>
						)}

						{userLocation && item.latitude && item.longitude && (
							<Text style={styles.distance}>
								📍 À{' '}
								{getDistanceKm(userLocation, {
									latitude: item.latitude,
									longitude: item.longitude,
								}).toFixed(1)}{' '}
								km
							</Text>
						)}
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	searchInput: {
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 12,
	},
	picker: {
		marginBottom: 16,
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	checkboxContainer: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	checkbox: {
		fontSize: 14,
		color: '#333',
	},
	card: {
		padding: 16,
		marginBottom: 16,
		backgroundColor: '#fff',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
	},
	category: {
		fontSize: 12,
		color: '#999',
		marginBottom: 8,
	},
	premiumBadge: {
		color: '#f39c12',
		fontSize: 14,
		marginTop: 4,
	},
	freeBadge: {
		fontSize: 14,
		marginTop: 4,
	},
	distance: {
		fontSize: 13,
		color: '#333',
		marginTop: 4,
	},
});
