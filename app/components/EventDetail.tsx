import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function EventDetail() {
  const route = useRoute();
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>📅 {new Date(event.date).toLocaleDateString()}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text>Catégorie : {event.category}</Text>
      {event.is_premium && <Text style={styles.premium}>⭐ Premium</Text>}
      {/* Tu pourras réafficher la localisation ici plus tard */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  premium: {
    color: "gold",
    marginTop: 10,
  },
});
