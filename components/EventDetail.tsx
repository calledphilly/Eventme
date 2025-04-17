import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export default function EventDetail() {
	const route = useRoute();
	const { event } = route.params;

	return (
		<View style={styles.container}>
			<ThemedText
				type='title'
				style={styles.title}>
				{event.title}
			</ThemedText>
			<ThemedView style={styles.itemLayer}>
				<ThemedText>📅 {new Date(event.date).toLocaleDateString()}</ThemedText>
				<ThemedText style={styles.description}>{event.description}</ThemedText>
				<ThemedText>
					Catégorie :{' '}
					<ThemedText style={styles.category}>{event.category}</ThemedText>
				</ThemedText>
				{event.is_premium && (
					<ThemedText style={styles.premium}>⭐ Premium</ThemedText>
				)}
				{/* Tu pourras réafficher la localisation ici plus tard */}
			</ThemedView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		backgroundColor: '#fff',
	},
	title: {
		marginTop: '10%',
	},
	itemLayer: {
		marginTop: '8%',
		rowGap: 8,
	},
	description: {
		width: 320,
	},
	category: {
		fontWeight: 800,
		textTransform: 'capitalize',
	},
	premium: {
		color: 'gold',
	},
});
