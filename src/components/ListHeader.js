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
  ListItem
} from "native-base";

export default function CardHeader(props) {
  return (
    <ListItem itemHeader>
      <Text>{props.text}</Text>
    </ListItem>
  );
}
