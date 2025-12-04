import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../context/UserContext";
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // In a real app, you'd have logic here to determine if the user is logged in
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="App" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
