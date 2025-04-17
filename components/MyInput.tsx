import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const MyInput = ({ placeholder }: { placeholder: string }) => {
	return (
		<TextInput
			placeholder={placeholder}
			style={styles.input}
		/>
	);
};

export default MyInput;

const styles = StyleSheet.create({
	input: {
    padding: 15,
    borderColor: 'black',
    borderRadius: 10,
    boxShadow: 'inset 0 0 10 rgba(0, 0, 0, 0.2)',
  } ,
});