import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import Screens

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
//import RegisterDonorScreen from "./screens/RegisterDonorScreen";
import EligibilityTestScreen from "./screens/EligibilityTestScreen";
import ResultScreen from "./screens/ResultScreen";
import BottomTabsNavigator from "./navigation/BottomTabsNavigator";


const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSplashVisible ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            {/* <Stack.Screen
              name="RegisterDonor"
              component={RegisterDonorScreen}
            /> */}
            <Stack.Screen
              name="EligibilityTest"
              component={EligibilityTestScreen}
            />
            <Stack.Screen
              name="Result"
              component={ResultScreen}
            />
            <Stack.Screen name="Main" component={BottomTabsNavigator} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
