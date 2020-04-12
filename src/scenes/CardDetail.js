import React from "react";
import { Image } from "react-native";
import { Card, CardItem, Body, Text, Thumbnail, Icon } from "native-base";
import { characterSwap, arrToString } from "../utils/textParser";
import { deleteCard } from "../utils/infoSaver";

export default function ({ route, navigation }) {
  const { setCards, card } = route.params;
  const { cardId, uri, name, description, ingredients, tags } = card;
  return (
    <Card>
      <CardItem header>
        <Icon name="edit" type="AntDesign" />
        <Icon
          name="delete"
          type="AntDesign"
          onPress={() => {
            setCards((prev) => {
              const newCards = { ...prev };
              delete newCards[cardId];
              deleteCard(cardId);
              return newCards;
            });
          }}
        />
      </CardItem>
      <CardItem cardBody style={{ justifyContent: "center" }}>
        <Image
          style={{ width: 395, height: 395 }}
          resizeMode="contain"
          source={{ uri }}
        />
      </CardItem>
      <CardItem>
        <Text>{name && characterSwap(name, "_", " ")}</Text>
      </CardItem>
      <CardItem>
        <Text>{description}</Text>
      </CardItem>
      <CardItem>
        <Text>Ingredients: {ingredients.join(", ")}</Text>
      </CardItem>
      <CardItem>
        <Text>Tags: {tags.join(", ")}</Text>
      </CardItem>
    </Card>
  );
}
