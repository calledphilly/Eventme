import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const MyInput = ({
	placeholder,
	onChangeText,
	value,
	secureTextEntry,
}: {
	placeholder: string;
	onChangeText?: ((text: string) => void) | undefined;
	value?: string | undefined;
	secureTextEntry?: boolean;
}) => {
	return (
		<TextInput
			placeholder={placeholder}
			style={styles.input}
			onChangeText={onChangeText}
			value={value}
			secureTextEntry={secureTextEntry}
			placeholderTextColor='#666'
		/>
	);
};

export default MyInput;

const styles = StyleSheet.create({
	input: {
		width: '100%',
		padding: 15,
		borderRadius: 10,
		boxShadow: 'inset 0 0 10 rgba(0, 0, 0, 0.2)',
	},
});
