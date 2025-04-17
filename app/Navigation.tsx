// Navigation.tsx
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import EventList from "@/components/EventList";
import EventDetail from "@/components/EventDetail";
import AuthScreen from "@/components/AuthScreen";
import { useAuth } from "@/hooks/useAuth";

const Stack = createStackNavigator();

export default function Navigation() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={session ? "EventList" : "AuthScreen"}>
      <Stack.Screen name="EventList" component={EventList} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
    </Stack.Navigator>
  );
}
