import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Screen from "../../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log("Signing up with:", email, password);
    // On successful sign-up, navigate to the main app
    // navigation.navigate("MainApp"); // Example navigation
  };

  const handleGoogleSignUp = () => {
    // Implement Google Sign-In logic here
    console.log("Signing up with Google");
    // On successful Google sign-up, navigate to the main app
    // navigation.navigate("MainApp"); // Example navigation
  };

  return (
    <Screen isScrollable={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon} />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subText}>Sign up to get started</Text>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.subtleText}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.subtleText}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={colors.subtleText}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity onPress={handleSignUp}>
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.authButton}
          >
            <Text style={styles.authButtonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or sign up with</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
          <Ionicons name="logo-google" size={24} color="#DB4437" />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 25,
    },
    header: {
      alignItems: "center",
      marginBottom: 40,
    },
    backButton: {
      position: 'absolute',
      left: 0,
      top: 5,
    },
    welcomeText: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    subText: {
      fontSize: 16,
      color: colors.subtleText,
      textAlign: "center",
    },
    inputGroup: {
      width: "100%",
      marginBottom: 20,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    authButton: {
      width: "100%",
      padding: 15,
      borderRadius: 30,
      alignItems: "center",
    },
    authButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    separatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 30,
      width: "100%",
    },
    separatorLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    separatorText: {
      marginHorizontal: 10,
      color: colors.subtleText,
      fontSize: 14,
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 12,
      borderRadius: 30,
      width: "100%",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    googleButtonText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    loginPrompt: {
      flexDirection: "row",
      marginTop: 30,
      justifyContent: "center",
    },
    loginPromptText: {
      fontSize: 14,
      color: colors.subtleText,
    },
    loginLink: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.primary,
    },
  });

export default SignUpScreen;