import React from "react";
import { Image } from "react-native";
import { Card, CardItem, Body, Text, Thumbnail } from "native-base";
import { characterSwap, arrToString } from "../utils/textParser";
export default function(props) {
  return (
    <Card>
      <CardItem cardBody style={{ justifyContent: "center" }}>
        <Image
          style={{ width: 395, height: 395 }}
          resizeMode="contain"
          source={{ uri: props.uri }}
        />
      </CardItem>
      <CardItem>
        <Text>{characterSwap(props.name, "_", " ")}</Text>
      </CardItem>
      <CardItem>
        <Text>{props.description}</Text>
      </CardItem>
      <CardItem>
        <Text>Ingredients: {props.ingredients.join(', ')}</Text>
      </CardItem>
      <CardItem>
        <Text>Tags: {props.tags.join(', ')}</Text>
      </CardItem>
    </Card>
  );
}
