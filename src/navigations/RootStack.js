import React from "react";
import {
  createStackNavigator,
  TransitionPresets
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Category from "../scenes/Category";
import HomeStack from "./HomeStack";
import HalfModal from "../scenes/HalfModal";
import {theme} from '../styles/theme'

const Stack = createStackNavigator();

//function for animating mdodal
const fadeIn = progress => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.25, 0.7, 1]
    })
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: "clamp"
    })
  }
});



export default function Nav() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => fadeIn(progress)
        }}
        headerMode="screen"
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HalfModal"
          component={HalfModal}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
