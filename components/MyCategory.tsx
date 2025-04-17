import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const MyCategory = ({ children }: PropsWithChildren) => {
	return (
		<ThemedView style={styles.categoryLayer}>
			<ThemedText style={styles.categoryText}># {children}</ThemedText>
		</ThemedView>
	);
};

export default MyCategory;

const styles = StyleSheet.create({
	categoryLayer: {
		// display: 'flex',
		// width: 105,
		backgroundColor: 'black',
		padding: 2,
		borderRadius: 20,
	},
	categoryText: {
		fontWeight: 700,
		color: 'white',
		textAlign: 'center',
	},
});
