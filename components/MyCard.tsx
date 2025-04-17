import React from 'react';
import { Image, StyleSheet } from 'react-native';
import MyButton from './MyButton';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
type PropsCard = {
	title?: string;
	time?: any;
	localisation?: any;
	description?: string;
	image?: string;
};
const MyCard = ({ title, time, localisation, description, image }: PropsCard) => {
	return (
		<ThemedView style={styles.view}>
			<Image
				style={styles.image}
				source={require('@/assets/images/adaptive-icon.png')}
			/>
			<ThemedView style={styles.itemLayer}>
				<ThemedText type='title'>Heading</ThemedText>
				<ThemedText type='subtitle'>subheading</ThemedText>
				<ThemedText>time</ThemedText>
				<ThemedText>localisation</ThemedText>
			</ThemedView>
			<ThemedView style={styles.buttonLayer}>
				<MyButton title='Je participe !' />
				<MyButton title='Ajouter à mes events' />
			</ThemedView>
		</ThemedView>
	);
};

export default MyCard;

const styles = StyleSheet.create({
	view: {
		flexDirection: 'column',
		rowGap: 40,
		boxShadow: '0 0 20 rgba(0, 0, 0, 0.2)',
		width: '100%',
		borderRadius: '10%',
		padding: 30,
	},
	image: { height: 150, width: '100%', objectFit: 'cover' },
	itemLayer: {
		flexDirection: 'column',
		rowGap: 5,
	},
	buttonLayer: { flexDirection: 'column', rowGap: 15 },
});
