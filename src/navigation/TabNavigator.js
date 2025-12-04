import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import HomeIcon from "../../assets/icons/HomeIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon"; // Corrected path

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10, // Add padding at the top of the tab bar
          paddingBottom: useSafeAreaInsets().bottom, // Apply safe area inset to the bottom
          height: 60 + useSafeAreaInsets().bottom, // Adjust total height
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "HomeTab") {
            return <HomeIcon focused={focused} color={color} size={size} />; // Use imported component
          } else if (route.name === "Profile") {
            return <ProfileIcon focused={focused} color={color} size={size} />; // Use imported component
          }
          return null; // Should not happen with defined routes
        },
        tabBarActiveTintColor: "#fd2153",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ title: "Home" }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;