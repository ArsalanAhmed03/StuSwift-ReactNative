import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarBackground: () => (
          <LinearGradient
            colors={["#747FBB", "#1C214A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        tabBarStyle: {
          // backgroundColor: "#283593",
          height: 70,
          borderTopWidth: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: "white",
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#283593", // Color for active icon when selected
        tabBarInactiveTintColor: "#ffffff", // Color for inactive icons
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Define icons for each route
          if (route.name === "tasks") {
            iconName = "checkbox";
          } else if (route.name === "profile") {
            iconName = "person";
          } else if (route.name === "index") {
            iconName = "home";
          } else if (route.name === "chats") {
            iconName = "chatbox";
          } else if (route.name === "music") {
            iconName = "musical-notes";
          }

          return (
            <View
              style={{
                backgroundColor: focused ? "white" : "transparent",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                padding: focused ? 7 : 0, 
              }}
            >
              <Ionicons name={iconName} color={focused ? "#283593" : color} size={size} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: "Music",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
