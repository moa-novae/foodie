import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./homeStack";
import HalfModal from "../components/HalfModal";
import React from "react";
import ReactNative, { View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  ActionSheet
} from "native-base";

const Stack = createStackNavigator();

export default function() {
  return (
    <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
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
          })
        }}
        mode="modal"
        headerMode="none"
        initialRouteName="myModal"
      >
      <Stack.Screen name="MyModal" component={HalfModal} />
    </Stack.Navigator>
  );
}
