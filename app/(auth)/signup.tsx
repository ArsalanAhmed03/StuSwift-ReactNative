import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FIREBASE_AUTH } from "../../FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FireBaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Signup() {
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [datausernames, setdatausernames] = useState([]);
  const [dataemails, setdataemails] = useState([]);
  const auth = FIREBASE_AUTH;

  const SignPress = async () => {
    if (username == datausernames) {
      alert("Username must be unique!");
      return;
    }
    if (email == dataemails) {
      alert("Email Address must be unique");
      return;
    }
    const userinfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userinfo.user;
    await setDoc(doc(FIRESTORE_DB, "Users", user.uid), {
      fullName: fullname,
      username: username,
      email: email,
      password: password,
      createdAt: new Date(),
    });

    router.back();
  };

  const loginBtnPressed = () => {
    router.back();
  };

  function handlesignup() {
    if (!fullname || !username || !email || !password || !confirmpass) {
      alert("Fill all the feilds");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (password != confirmpass) {
      alert("Fill both Password feilds same");
      return;
    }
    SignPress();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Join StuSwift Universe!</Text>
      <Text style={styles.subText}>Embark on your epic college quest</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#ccc"
        value={fullname}
        onChangeText={setfullname}
      />
      <TextInput
        style={styles.input}
        placeholder="UserName"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setusername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={setemail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        value={password}
        onChangeText={setpassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        value={confirmpass}
        onChangeText={setconfirmpass}
      />

      <TouchableOpacity style={styles.button} onPress={handlesignup}>
        <Text style={styles.buttonText}>Confirm Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        {/* <Link href="/login" asChild> */}
        <TouchableOpacity onPress={loginBtnPressed}>
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
