import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../scenes/Home";
import { Category } from "../scenes/Category";
import React from "react";
import ReactNative from "react-native";
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
  Text
} from "native-base";

const Stack = createStackNavigator();
function LogoTitle() {
  return (
    <Icon
      style={{ width: 50, height: 50 }}
      name="satellite-dish"
      type="FontAwesome5"
    />
  );
}
export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            headerTitle: props => <LogoTitle/>,
            headerStyle: {
              marginTop: 2
            }
          })}
        />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
