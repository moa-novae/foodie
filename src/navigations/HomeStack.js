import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../scenes/Home";
import { Icon } from "native-base";
import Category from "../scenes/Category";
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
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        mode='card'
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
      <Stack.Screen name="Category" component={Category} />
    </Stack.Navigator>
  );
}
