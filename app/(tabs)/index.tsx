import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MyForm from '@/components/ui/MyForm';

export default function HomeScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}>
			<ThemedView>
				<ThemedText
					type='title'
					style={styles.title}>
					EventMe !
				</ThemedText>
			</ThemedView>
			<MyForm style={{ marginTop: '10%' }} />
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	title: { textAlign: 'center' },
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
