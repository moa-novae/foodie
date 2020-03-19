import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../scenes/Home";
import { Category } from "../scenes/Category";
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
import HalfModal from "../components/HalfModal";

const Stack = createStackNavigator();
function LogoTitle() {
  return (
    <Icon
      style={{ marginLeft: 10, marginRight: 10, fontSize: 30 }}
      name="satellite-dish"
      type="FontAwesome5"
    />
  );
}

var BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];

export default function Nav() {
  return (
    <NavigationContainer>
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
        headerMode="screen"
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            headerTitle: props => <LogoTitle />,
            headerRight: () => (
              <Icon
                style={{ marginLeft: 10, marginRight: 10, fontSize: 30 }}
                name="list-ul"
                type="FontAwesome5"
                onPress={() => navigation.navigate("HalfModal")}
              />
            )
          })}
        />
        <Stack.Screen name="HalfModal" component={HalfModal}  options={{headerShown: false}}/>
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
