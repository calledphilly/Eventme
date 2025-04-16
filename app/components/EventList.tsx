import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useEvents } from "../hooks/useEvents";
import { useNavigation } from "@react-navigation/native";

export default function EventList() {
  const { events, loading } = useEvents();
  const navigation = useNavigation();

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("EventDetail", { event: item })}
        >
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.category}</Text>
            {item.is_premium && <Text style={styles.premium}>⭐ Premium</Text>}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  premium: {
    color: "gold",
    marginTop: 4,
  },
});
