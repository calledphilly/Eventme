import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

const MyButton = ({ title }: { title: string }) => {
	return (
		<ThemedView style={styles.button}>
			<Button
				title={title}
				color='white'
			/>
		</ThemedView>
	);
};

export default MyButton;

const styles = StyleSheet.create({
	button: {
		paddingVertical: 2,
		borderRadius: '3%',
		backgroundColor: 'black',
	},
});
