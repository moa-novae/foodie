import React, { useState, useEffect } from "react";
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

export default function CardHeader(props) {
  const { category } = props;

  return (
    <ListItem
      style={styles.listItem}
      noBorder
      button
      icon
      onPress={() =>
        props.navigation.navigate("ResultOverview", {
          cards: props.cards,
          setCards: props.setCards,
          searchTags: category.tags,
        })
      }
    >
      <Left>
        <Icon
          active
          name={category.icon}
          type="FontAwesome5"
          style={{ fontSize: 20, color: category.iconColor }}
        />
      </Left>
      <Body>
        <Text>{category.name}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 15,
    paddingHorizontal: 5,
    height: 45,
  },
  icon: {
    fontSize: 20,
    color: "red",
  },
});
