import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Login() {
  const handleLogin = () => {
    const isValid = true;

    if (isValid) {
      router.replace("/(tabs)");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In Into Your Account</Text>
      <Text style={styles.subText}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        {/* <Link href="/signup" asChild> */}
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.signupText}> Sign Up Now</Text>
        </TouchableOpacity>
        {/* </Link> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#cccccc",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#333333",
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#7b7fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    color: "#ffffff",
    fontSize: 14,
  },
  signupText: {
    color: "#7b7fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
