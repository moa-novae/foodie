import {
  Container,
  Card,
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
  List,
  ListItem
} from "native-base";
import React from "react";
import ReactNative from "react-native";
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
    <ListBody key={index} text={category.name} icon={category.icon} navigation={navigation} />
  ));
  return (
    <Container>
      <Content>
        <List>
          <ListHeader text="Food" />
          {categoriesList}
        </List>
      </Content>
    </Container>
  );
}
