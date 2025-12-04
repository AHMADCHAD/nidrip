import React from 'react';
import RootNavigator from "./src/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { CartProvider } from "./src/context/CartContext";
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
