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

export default function CardHeader(props) {
  return (
    <ListItem button icon onPress={()=>props.navigation.navigate('Category')}>
      <Left>
      <Icon active name={props.icon} type="FontAwesome5"/>
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

