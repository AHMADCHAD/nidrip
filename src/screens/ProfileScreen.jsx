import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.container}>
        <Ionicons name="person-circle-outline" size={100} color="#ccc" />
        <Text style={styles.placeholderText}>Profile Screen</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 20,
    fontSize: 18,
    color: "#999",
  },
});

export default ProfileScreen;