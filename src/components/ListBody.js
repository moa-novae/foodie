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
import {categoryFinder} from '../utils/SearchFunctions'


export default function CardHeader(props) {
  return (
    <ListItem
      button
      icon
      onPress={() =>
        props.navigation.navigate("Category", {
          categoryItems: { ...props.cards }
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
