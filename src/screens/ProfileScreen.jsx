import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/UserContext";
import fonts from "../theme/fonts";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const styles = getStyles(colors);

  console.log('here is the user', user)

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerIcon} />
      </View>
      <View style={styles.container}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color={colors.subtleText}
        />
        <Text style={styles.userName}>{user?.displayName || "Guest"}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const getStyles = (colors) => StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    textAlign: 'center',
    flex: 1,
    color: colors.text,
  },
  headerIcon: {
    width: 40,
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
    fontFamily: fonts.bold,
    color: colors.text,
  },
  logoutButton: {
    marginTop: 40,
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
    fontFamily: fonts.semiBold,
  },
});

export default ProfileScreen;