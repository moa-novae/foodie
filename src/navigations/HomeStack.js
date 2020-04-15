import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Button, Text } from "native-base";
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
function EditCard(navigation, route) {
  const { setCards, setCardsOfThisCategory, cardId, card } = route.params;
  return {
    headerRight: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate("CreateNew", { card, cardId, title: "EDIT" });
        }}

        // onPress={() => {
        //   setCards((prev) => {
        //     const newCards = { ...prev };
        //     delete newCards[cardId];
        //     return newCards;
        //   });
        //   setCardsOfThisCategory((prev) => {
        //     const newCards = { ...prev };
        //     delete newCards[cardId];
        //     return newCards;
        //   });
        //   navigation.goBack();
        // }}
      >
        <Text style={{ fontSize: 18, color: "#2164ff" }}>EDIT</Text>
      </Button>
    ),
  };
}

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
        options={{ ...TransitionPresets.SlideFromRightIOS, title: "Results" }}
      />

      <Stack.Screen
        name="CreateNew"
        component={CreateNew}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          title: "New Food Entry",
        }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen name="ShowImage" component={ShowImage} />
      <Stack.Screen
        name="CreateNewCategory"
        component={CreateCategoryStack}
        options={{ title: "Create New Category" }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        options={({ navigation, route }) => EditCard(navigation, route)}
      />
    </Stack.Navigator>
  );
}
