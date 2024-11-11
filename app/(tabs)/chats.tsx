import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import C from "../CreateGroup";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB } from "../../FireBaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
export default function chats() {
  const [setgroups, showgroups] = useState<string[]>([]);
  // function group_creation(groupName)
  // {
  //     if (groupName){
  //         showgroups([...setgroups,groupName]);
  //         return;
  //     }
  // }
  // useEffect(() => {
  //   if (groupName) {
  //     group_creation(groupName);
  //   }
  // }, [groupName]);
  const chatgroups = async () => {
    const user = getAuth().currentUser;

    if (user) {
      const userDoc = await getDoc(doc(FIRESTORE_DB, "Users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Username:", userData.username);
        const currentUser = userData.username;
        const groups = collection(FIRESTORE_DB, "Groups");
        const snapshot = await getDocs(groups);
        const userGroups = snapshot.docs
          .filter((doc) => {
            const groupMembers = doc.data().GroupMembers || [];
            return groupMembers.includes(currentUser); // Check if the user is in GroupMembers
          })
          .map((doc) => doc.data().GroupName); // Extract group names
        showgroups(userGroups);
      }
    }
  };
  chatgroups();

  return (
    <View style={mainstyles.maincontainer}>
      <>
        <View style={mainstyles.HeadingContainer}>
          <View style={mainstyles.ArrowContainer}>
            <Ionicons
              name="arrow-back-sharp"
              size={30}
              color="black"
              cursor="pointer"
            />
          </View>
          <Text style={mainstyles.Heading}>Chat Groups</Text>
        </View>
        <ScrollView style={mainstyles.groupsContainer}>
          {setgroups.map((group, index) => (
            <View key={index} style={mainstyles.groupContainer}>
              <Text style={mainstyles.groupText}>{group}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={mainstyles.PlusContainer}>
          {/* <TouchableOpacity style={mainstyles.ahmed} onPress={()=>navigation.navigate('Create Group')}> */}
          <Ionicons name="add-outline" size={40} color="white" />
        </View>
      </>
    </View>
  );
}
const mainstyles = StyleSheet.create({
  ahmed: {
    backgroundColor: "#3B3B98",
    borderRadius: 20,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  HeadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  ArrowContainer: {
    position: "absolute",
    top: 10,
    left: 8,
    cursor: "pointer",
  },
  scrollContainer: {
    paddingBottom: 100,
    left: 10,
  },
  PlusContainer: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
    right: 10,
  },
  groupsContainer: {
    marginTop: 60,
    // paddingHorizontal: 10,
    paddingBottom: 100,
  },
  groupContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "#3B3B98",
    alignItems: "flex-start",
    marginVertical: 0,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
  },
  groupText: {
    position: "absolute",
    color: "white",
    fontSize: 18,
    padding: 17.5,
    left: 50,
  },
  groupimg: {
    position: "absolute",
    height: 30,
    width: 30,
    borderRadius: 50,
    top: 15,
    left: 20,
  },
});
