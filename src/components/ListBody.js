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
  Body,
} from "native-base";
import { StyleSheet, View } from "react-native";
import * as testData from "../assets/sampleData";
import { categoryFinder } from "../utils/SearchFunctions";

export default function CardHeader(props) {
  return (
    <ListItem
    noBorder
      style={styles.listItem}
      button
      icon
      onPress={() =>
        props.navigation.navigate("Category", {
          categoryItems: { ...props.cards },
        })
      }
    >
      <Left>
        <Icon active name={props.icon} type="FontAwesome5" style={styles.icon} />
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

const styles = StyleSheet.create({
  listItem: {
    marginTop: 8,
    marginBottom: 8,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  icon: {
    fontSize: 20, 
    color: 'red',
  }
});
