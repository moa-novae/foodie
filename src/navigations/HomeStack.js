import React from "react";
import {
  createStackNavigator,
  TransitionPresets
} from "@react-navigation/stack";
import { DefaultTheme } from "@react-navigation/native";
import Home from "../scenes/Home";
import { Icon } from "native-base";
import Category from "../scenes/Category";
import CreateNew from "../scenes/CreateNew";
import Camera from "../scenes/Camera";
import ShowImage from "../scenes/ShowImage";
const Stack = createStackNavigator();
function LogoTitle() {
  return (
    <Icon
      style={{
        marginLeft: 10,
        marginRight: 10,
        fontSize: 30,
        color: "#cee5f2"
      }}
      name="hippo"
      type="FontAwesome5"
    />
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1f2232"
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          headerTitle: props => <LogoTitle />,
          headerRight: () => (
            <Icon
              style={{
                marginLeft: 10,
                marginRight: 10,
                fontSize: 30,
                color: "#cee5f2"
              }}
              name="search"
              type="FontAwesome5"
              onPress={() => navigation.navigate("HalfModal")}
            />
          )
        })}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="CreateNew"
        component={CreateNew}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen name="ShowImage" component={ShowImage} />
    </Stack.Navigator>
  );
}
