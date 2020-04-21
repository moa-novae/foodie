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
import { capitalizeAsTitle } from "../utils/textParser";

export default function ListBody(props) {
  const { category } = props;

  return (
    <ListItem
      style={styles.listItem}
      noBorder
      button
      icon
      onPress={() => {
        //close row slider
        if (props.closeRow) {
          props.closeRow();
        }
        props.navigation.navigate("ResultOverview", {
          cards: props.cards,
          setCards: props.setCards,
          searchTags: category.tags,
        });
      }}
    >
      <Left>
        
        {category.icon && (
          <Icon
            active
            name={category.icon}
            type="FontAwesome5"
            style={{ fontSize: 20, color: category.iconColor }}
          />
        )}
      </Left>
      <Body>
        <Text>{capitalizeAsTitle(category.name)}</Text>
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
