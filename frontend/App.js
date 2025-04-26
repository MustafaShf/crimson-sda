import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message'; 

import SplashScreen from './screens/SplashScreen'; // 👈 Splash screen import
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/RegisterScreen';
import EligibilityQ1 from './screens/EligibilityTestScreen';
import EligibilityQ2 from './screens/EligibilityQ2';
import EligibilityQ3 from './screens/EligibilityQ3';
import EligibilityQ4 from './screens/EligibilityQ4';
import HomeScreen from './screens/HomeScreen';
import FindDonorScreen from './screens/FindDonorScreen';
import RequestScreen from './screens/RequestScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import ChatScreen from './screens/chatScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import LeaderboardScreen from './screens/leadScreen';
import AdminDashboard from './screens/AdminScreen';

const Stack = createNativeStackNavigator(); // ✅ This should be before App()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          {/* 👇 Splash screen comes first */}
          <Stack.Screen name="Splash" component={SplashScreen} /> 
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
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
          <Stack.Screen name="leadBoard" component={LeaderboardScreen} />
          <Stack.Screen name="AdminPanel" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* ✅ Toast shown globally */}
      <Toast />
    </>
  );
}
