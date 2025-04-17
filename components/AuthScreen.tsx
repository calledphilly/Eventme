import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { signUp, signIn } from "../components/utils/auth";
import { useAuth } from "../hooks/useAuth";

export default function AuthScreen({ navigation }: { navigation: any }) {
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session) {
      navigation.navigate("EventList");
    }
  }, [session, navigation]);

  const handleAuth = async () => {
    setErrorMessage("");

    let response;
    if (isLogin) {
      response = await signIn(email, password);
    } else {
      response = await signUp(email, password, name);
    }

    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      console.log("Authentification réussie !");
      navigation.navigate("EventList");
    }
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
      )}
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
