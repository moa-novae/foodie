import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Category from "../scenes/Category";
import HomeStack from "./HomeStack";
import HalfModal from "../scenes/HalfModal";
import { theme } from "../styles/theme";
import ChooseIcon from "../scenes/ChooseIcon";
import ChooseColor from "../scenes/ChooseColor";
import CreateNewCategory from "../scenes/CreateNewCategory";
const Stack = createStackNavigator();

//function for animating mdodal
const fadeIn = (progress) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.25, 0.7, 1],
    }),
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: "clamp",
    }),
  },
});

export default function Nav() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => fadeIn(progress),
      }}
      headerMode="screen"
      initialRouteName="CreateNewCategory"
    >
      <Stack.Screen
        name="CreateNewCategory"
        options={{ headerShown: false }}
        component={CreateNewCategory}
      />
      <Stack.Screen
        name="ChooseColor"
        component={ChooseColor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseIcon"
        component={ChooseIcon}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
