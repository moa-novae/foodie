import { Container, Content, List, Fab, Icon, Button } from "native-base";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import ListHeader from "../components/ListHeader";
import ListBody from "../components/ListBody";
import Tag from "../components/Tag";
import NewButton from "../components/NewButton";
import { readFromLocal } from "../utils/infoSaver";

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
        <Button
          onPress={() => {
            readFromLocal("cards").then(console.log);
          }}
        >
          <Text>Test</Text>
        </Button>
      </Content>
      <NewButton navigation={navigation} />
    </Container>
  );
}
