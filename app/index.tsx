import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/useAuth";
import Navigation from "./Navigation";
import 'react-native-gesture-handler';

export default function Index() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Navigation />;
}
