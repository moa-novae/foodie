import { Container, Content, List, Fab, Icon } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import ListHeader from "../components/ListHeader";
import ListBody from "../components/ListBody";
import Tag from "../components/Tag";

const testArr = [
  { name: "Food", icon: "utensils" },
  { name: "Drinks", icon: "wine-glass" }
];
const meals = ["Dinner", "Lunch", "Breakfast"];

export default function Home({ navigation }) {
  const categoriesList = testArr.map((category, index) => (
    <ListBody
      key={index}
      text={category.name}
      icon={category.icon}
      navigation={navigation}
    />
  ));
  return (
    <Container style={{ backgroundColor: "#ffffff" }}>
      <Content>
        <List>
          <ListHeader text="Food" />
          {categoriesList}
        </List>
      </Content>
      <TouchableOpacity
        style={{
          backgroundColor: "#1f2232",
          borderWidth: 1,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          height: 70,
          borderRadius: 70,
          position: "absolute",
          bottom: 20,
          right: 20
        }}
        onPress={() => navigation.navigate("CreateNew")}
      >
        <Icon name="plus" type="FontAwesome5" style={{ color: "white" }} />
      </TouchableOpacity>
    </Container>
  );
}
