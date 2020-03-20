import React, {useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "native-base";
import Category from "../scenes/Category";
import Home from "../scenes/Home";
import HalfModal from "../scenes/HalfModal";

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
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => fadeIn(progress),
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
        <Stack.Screen
          name="HalfModal"
          component={HalfModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
