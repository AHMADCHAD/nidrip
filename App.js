import React from 'react';
import RootNavigator from "./src/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </CartProvider>
  );
}
