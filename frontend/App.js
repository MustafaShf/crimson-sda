import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { UserProvider } from "./context/userContext";
import { UserBloodGroupProvider } from "./context/UserBloodGroupContext";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/RegisterScreen";
import EligibilityQ1 from "./screens/EligibilityTestScreen";
import EligibilityQ2 from "./screens/EligibilityQ2";
import EligibilityQ3 from "./screens/EligibilityQ3";
import EligibilityQ4 from "./screens/EligibilityQ4";
import HomeScreen from "./screens/HomeScreen";
import FindDonorScreen from "./screens/FindDonorScreen"; // adjust path if needed
import RequestScreen from "./screens/DonateScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationScreen from "./screens/NotificationScreen";
import LeaderboardScreen from "./screens/leadScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <UserBloodGroupProvider>
        {" "}
        {/* 👈 Wrap inside UserProvider */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="EligibilityQ1" component={EligibilityQ1} />
            <Stack.Screen name="EligibilityQ2" component={EligibilityQ2} />
            <Stack.Screen name="EligibilityQ3" component={EligibilityQ3} />
            <Stack.Screen name="EligibilityQ4" component={EligibilityQ4} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="FindDonor" component={FindDonorScreen} />
            <Stack.Screen name="Request" component={RequestScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="leadBoard" component={LeaderboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </UserBloodGroupProvider>
    </UserProvider>
  );
}
