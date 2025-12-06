import React, { useCallback, useEffect, useState } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { CartProvider } from "./src/context/CartContext";
import { UserProvider } from "./src/context/UserContext";
import { useFonts } from "expo-font";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";


export default function App() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Medium": require("./assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  });

  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        if (!fontsLoaded) return; // Wait until fonts are loaded

        // Optional branding delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setReadyToRender(true);
        await SplashScreen.hideAsync(); // Hide splash as soon as ready
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (readyToRender) {
      await SplashScreen.hideAsync();
    }
  }, [readyToRender]);

   const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#000000', // or your app’s background color
    },
  };

  if (!readyToRender) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <NavigationContainer theme={MyTheme}>
              <RootNavigator />
            </NavigationContainer>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </View>
  );
}
