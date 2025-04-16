import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { signUp, signIn } from "../components/utils/auth";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuth = async () => {
    setErrorMessage("");

    let response;
    if (isLogin) {
      response = await signIn(email, password);
    } else {
      response = await signUp(email, password);
    }

    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      console.log("Authentification réussie !");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button
        title={isLogin ? "Se connecter" : "S'inscrire"}
        onPress={handleAuth}
      />
      <Text
        style={styles.toggleText}
        onPress={() => setIsLogin((prevState) => !prevState)}
      >
        {isLogin
          ? "Pas encore de compte ? Inscris-toi"
          : "Déjà un compte ? Connecte-toi"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    width: "80%",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  toggleText: {
    color: "blue",
    marginTop: 16,
    textAlign: "center",
  },
});
