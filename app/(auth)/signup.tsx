import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Join StuSwift Universe!</Text>
      <Text style={styles.subText}>Embark on your epic college quest</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="UserName"
        placeholderTextColor="#ccc"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Confirm Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        {/* <Link href="/login" asChild> */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.signupText}> Login</Text>
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
    padding: 20, // Adjust padding as per your design
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
