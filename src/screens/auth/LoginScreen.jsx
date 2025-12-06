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
import fonts from "../../theme/fonts";
import { signInWithEmail, signInWithGoogle } from "../../firebase/AuthService";
import NidripButton from "../../components/NidripButton";

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { user, error } = await signInWithEmail(email, password);
    if (error) {
      setError(error.message);
    } else {
      // The onAuthStateChanged listener will handle navigation,
      // but we can update the context here.
      login(user);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    const { user, error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    } else {
      login(user);
    }
    setLoading(false);
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <NidripButton title="Login" onPress={handleLogin} loading={loading} />

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
      fontFamily: fonts.bold,
      color: colors.text,
      marginBottom: 10,
    },
    subText: {
      fontSize: 16,
      fontFamily: fonts.medium,
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
      fontFamily: fonts.medium,
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
      fontFamily: fonts.semiBold,
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
    signUpPrompt: {
      flexDirection: "row",
      marginTop: 30,
      justifyContent: "center",
    },
    signUpPromptText: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: colors.subtleText,
    },
    signUpLink: {
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
  });

export default LoginScreen;