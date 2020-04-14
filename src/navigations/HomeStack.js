import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { DefaultTheme } from "@react-navigation/native";
import Home from "../scenes/Home";
import { Icon } from "native-base";
import Category from "../scenes/Category";
import CreateNew from "../scenes/CreateNewCard";
import Camera from "../scenes/Camera";
import ShowImage from "../scenes/ShowImage";
import ResultOverview from "../scenes/ResultOverview";
import CardDetail from "../scenes/CardDetail";
import CreateCategoryStack from "./CreateCategoryStack";

const homeHeader = function (navigation, route) {
  return {
    headerTitle: (props) => <LogoTitle />,
    headerRight: () => (
      <Icon
        style={{
          marginLeft: 10,
          marginRight: 10,
          fontSize: 30,
          color: "#2164ff",
        }}
        name="search1"
        type="AntDesign"
        onPress={() => navigation.navigate("HalfModal")}
      />
    ),
  };
};

const Stack = createStackNavigator();
function LogoTitle() {
  return (
    <Icon
      style={{
        marginLeft: 10,
        marginRight: 10,
        fontSize: 30,
        color: "#2164ff",
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
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => homeHeader(navigation, route)}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="ResultOverview"
        component={ResultOverview}
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
      <Stack.Screen name="CreateNewCategory" component={CreateCategoryStack} />
      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
    </Stack.Navigator>
  );
}
