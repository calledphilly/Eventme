import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EventList from "../components/EventList";
import EventDetail from "../components/EventDetail";
import AuthScreen from "../components/AuthScreen";
import MyEvents from "../components/MyEvents";
import { useAuth } from "../hooks/useAuth";
import { View, ActivityIndicator } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="EventList">
      <Drawer.Screen
        name="EventList"
        component={EventList}
        options={{ title: "📅 Tous les événements" }}
      />
      <Drawer.Screen
        name="MyEvents"
        component={MyEvents}
        options={{ title: "🎫 Mes événements" }}
      />
    </Drawer.Navigator>
  );
}

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {session ? (
        <>
          <Stack.Screen name="Home" component={AppDrawer} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
        </>
      ) : (
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}
