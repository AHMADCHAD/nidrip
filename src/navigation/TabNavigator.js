import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import HomeIcon from "../../assets/icons/HomeIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon"; // Corrected path
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtleText,
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