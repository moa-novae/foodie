import React from "react";
import { Image } from "react-native";
import { Card, CardItem, Body, Text, Thumbnail, Icon } from "native-base";
import { characterSwap, arrToString } from "../utils/textParser";
import { deleteCard } from "../utils/infoSaver";
export default function (props) {
  return (
    <Card>
      <CardItem header>
        <Icon name="edit" type="AntDesign" />
        <Icon
          name="delete"
          type="AntDesign"
          onPress={() => {
            props.setCards((prev) => {
              const newCards = { ...prev };
              delete newCards[props.cardId];
              deleteCard(props.cardId);
              return newCards;
            });
          }}
        />
      </CardItem>
      <CardItem cardBody style={{ justifyContent: "center" }}>
        <Image
          style={{ width: 395, height: 395 }}
          resizeMode="contain"
          source={{ uri: props.uri }}
        />
      </CardItem>
      <CardItem>
        <Text>{props.name && characterSwap(props.name, "_", " ")}</Text>
      </CardItem>
      <CardItem>
        <Text>{props.description}</Text>
      </CardItem>
      <CardItem>
        <Text>Ingredients: {props.ingredients.join(", ")}</Text>
      </CardItem>
      <CardItem>
        <Text>Tags: {props.tags.join(", ")}</Text>
      </CardItem>
    </Card>
  );
}
