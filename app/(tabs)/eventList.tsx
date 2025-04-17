import { StyleSheet } from 'react-native';

import MyCard from '@/components/MyCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<IconSymbol
					size={310}
					color='#808080'
					name='chevron.left.forwardslash.chevron.right'
					style={styles.headerImage}
				/>
			}>
			<ThemedView>
				<ThemedText
					type='title'
					style={{ textAlign: 'center' }}>
					Behold event list !
				</ThemedText>
			</ThemedView>
			<ThemedView style={{ marginTop: '5%' }}>
				<MyCard />
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
