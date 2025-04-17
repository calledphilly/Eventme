import React from "react";
import { View, ActivityIndicator } from "react-native";

import Navigation from "./Navigation"; // Importation du composant de navigation qui contient le NavigationContainer
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Navigation />;  // Ici, nous affichons simplement le composant Navigation
}
