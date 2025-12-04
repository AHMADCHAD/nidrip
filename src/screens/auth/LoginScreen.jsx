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
import { useAuth } from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Dummy login: In a real app, you'd validate credentials against a server
    console.log("Attempting login with:", email, password);
    const dummyUser = { name: "John Doe", email: email };
    login(dummyUser);
  };

  const handleGoogleLogin = () => {
    // Implement Google Sign-In logic here
    console.log("Logging in with Google");
    // On successful Google login, navigate to the main app
    // navigation.navigate("MainApp"); // Example navigation
  };

  return (
    <Screen isScrollable={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subText}>Login to continue</Text>
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
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.authButton}
          >
            <Text style={styles.authButtonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or login with</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={24} color="#DB4437" />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>

        <View style={styles.signUpPrompt}>
          <Text style={styles.signUpPromptText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpLink}> Sign Up</Text>
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
    forgotPasswordButton: {
      alignSelf: "flex-end",
    },
    forgotPasswordText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "600",
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
    signUpPrompt: {
      flexDirection: "row",
      marginTop: 30,
      justifyContent: "center",
    },
    signUpPromptText: {
      fontSize: 14,
      color: colors.subtleText,
    },
    signUpLink: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.primary,
    },
  });

export default LoginScreen;