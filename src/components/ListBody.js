import React from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  ListItem,
  Left,
  Body
} from "native-base";
import { StyleSheet, View } from "react-native";
import * as testData from "../assets/sampleData";

const loadCategoryData = (data, category) => {
  let outputObj = {};
  for (let [key, value] of Object.entries(data)) {
    if (value.tags.includes(category)) {
      outputObj = { ...outputObj, [key]: value };
    }
  }
  return outputObj;
};

export default function CardHeader(props) {
  const categoryItems = loadCategoryData(
    testData.data,
    props.text.toLowerCase().trim()
  );
  console.log(props.text, categoryItems)
  return (
    <ListItem
      button
      icon
      onPress={() =>
        props.navigation.navigate("Category", {
          categoryItems: { ...categoryItems }
        })
      }
    >
      <Left>
        <Icon active name={props.icon} type="FontAwesome5" />
      </Left>
      <Body>
        <Text>{props.text}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
}
