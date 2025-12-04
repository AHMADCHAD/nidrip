import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/UserContext";

const ProfileScreen = ({ navigation }) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const styles = getStyles(colors);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.container}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color={colors.subtleText}
        />
        <Text style={styles.userName}>{user?.name || "Guest"}</Text>

        <View style={styles.themeToggleContainer}>
          <Text style={styles.themeToggleText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const getStyles = (colors) => StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userName: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  themeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 15,
    marginTop: 40,
    width: '100%',
  },
  themeToggleText: {
    fontSize: 16,
    color: colors.text,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
});

export default ProfileScreen;