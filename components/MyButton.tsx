import React from 'react';
import { Button, GestureResponderEvent, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

const MyButton = ({
	title,
	onPress,
}: {
	title: string;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {
	return (
		<ThemedView style={styles.button}>
			<Button
				title={title}
				color='white'
				onPress={onPress}
			/>
		</ThemedView>
	);
};

export default MyButton;

const styles = StyleSheet.create({
	button: {
		width: '100%',
		paddingVertical: 2,
		borderRadius: 10,
		backgroundColor: 'black',
	},
});
