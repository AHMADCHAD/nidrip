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
import fonts from "../../theme/fonts";
import { signUpWithEmail, signInWithGoogle } from "../../firebase/AuthService";
import { useAuth } from "../../context/UserContext";
import NidripButton from "../../components/NidripButton";

const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    const { user, error } = await signUpWithEmail(email, password, name);
    if (error) {
      setError(error.message);
    } else {
      // The onAuthStateChanged in App.js will handle navigation
      // but we can log the user in context immediately.
      login(user);
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");
    const { user, error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    } else {
      // The onAuthStateChanged in App.js will handle navigation
      // but we can log the user in context immediately.
      login(user);
    }
    setLoading(false);
  };

  return (
    <Screen isScrollable={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color={colors.icon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.headerIcon} />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={colors.subtleText}
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.subtleText}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor={colors.subtleText}
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeButton}>
              <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor={colors.subtleText}
              secureTextEntry={!isPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeButton}>
              <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <NidripButton
          title="Sign Up"
          onPress={handleSignUp}
          loading={loading}
        />

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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 40,
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
      alignItems: 'flex-start'
    },
    subText: {
      fontSize: 16,
      color: colors.subtleText,
      fontFamily: fonts.medium,
      textAlign: "center",
    },
    inputGroup: {
      width: "100%",
      marginBottom: 20,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 10,
      fontSize: 16,
      fontFamily: fonts.medium,
      color: colors.text,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 15,
      height: 45, // Set a fixed height
    },
    passwordInput: {
      // No background or border, it's a transparent input inside the container
      fontSize: 16,
      fontFamily: fonts.medium,
      color: colors.text,
      flex: 1,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      backgroundColor: colors.card,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 15,
      height: 45, // Set a matching fixed height
    },
    authButton: {
      width: "100%",
      padding: 15,
      borderRadius: 30,
      alignItems: "center",
      marginBottom: 0, // Reset margin if any
    },
    authButtonText: {
      color: "#fff",
      fontSize: 18,
      fontFamily: fonts.bold,
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
      fontFamily: fonts.medium,
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
      fontFamily: fonts.bold,
      color: colors.text,
    },
    loginPrompt: {
      flexDirection: "row",
      marginTop: 30,
      justifyContent: "center",
    },
    loginPromptText: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: colors.subtleText,
    },
    loginLink: {
      fontSize: 14,
      fontFamily: fonts.bold,
      color: colors.primary,
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginBottom: 10,
      fontFamily: fonts.medium,
    },
    eyeButton: {
      marginLeft: 10, // Space between text input and icon
    },
  });

export default SignUpScreen;