import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { signIn, signUp } from '../components/utils/auth'; // Fonction signUp et signIn
import MyButton from './MyButton';
import MyInput from './MyInput';
import { ThemedView } from './ThemedView';

export default function AuthScreen({ navigation }: { navigation: any }) {
	// Ajout de navigation comme prop
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState(''); // Nouveau state pour le champ name
	const [isLogin, setIsLogin] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	const handleAuth = async () => {
		setErrorMessage('');

		let response;
		if (isLogin) {
			response = await signIn(email, password);
		} else {
			response = await signUp(email, password, name); // Passer name lors de l'inscription
		}

		if (response.error) {
			setErrorMessage(response.error.message);
		} else {
			console.log('Authentification réussie !');
			// Après une connexion réussie, on redirige vers EventList
			navigation.navigate('EventList');
		}
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.inputLayer}>
				{!isLogin && (
					<MyInput
						placeholder='Nom'
						value={name}
						onChangeText={setName}
					/>
				)}
				<MyInput
					placeholder='Email'
					value={email}
					onChangeText={setEmail}
				/>
				<MyInput
					placeholder='Mot de passe'
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				{errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
			</ThemedView>
			<MyButton
				title={isLogin ? 'Se connecter' : "S'inscrire"}
				onPress={handleAuth}
			/>
			<Text
				style={styles.toggleText}
				onPress={() => setIsLogin((prevState) => !prevState)}>
				{isLogin
					? 'Pas encore de compte ? Inscris-toi'
					: 'Déjà un compte ? Connecte-toi'}
			</Text>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		rowGap: 60,
		padding: 16,
		width: '100%',
	},
	inputLayer: {
		width: '100%',
		rowGap: 20,
	},
	error: {
		color: 'red',
		marginBottom: 16,
	},
	toggleText: {
		textAlign: 'center',
	},
});
