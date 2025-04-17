import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import MyButton from '../MyButton';
import MyInput from '../MyInput';
import { ThemedView } from '../ThemedView';

const MyForm = ({ style }: { style: StyleProp<ViewStyle> }) => {
	return (
		<View style={style}>
			<ThemedView style={styles.mainLayer}>
				<ThemedView style={styles.inputLayer}>
					<MyInput placeholder='Enter your username' />
					<MyInput placeholder='Enter your password' />
				</ThemedView>
				<MyButton title='Se connecter' />
			</ThemedView>
		</View>
	);
};

export default MyForm;

const styles = StyleSheet.create({
	mainLayer: { flexDirection: 'column', rowGap: 90 },
	inputLayer: { marginTop: '25%', flexDirection: 'column', rowGap: 40 },
});
