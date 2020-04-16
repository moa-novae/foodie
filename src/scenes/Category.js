import { Container, Card, CardItem, Body, Content, Text } from "native-base";
import React, { useState, useEffect } from "react";
import ReactNative from "react-native";
import { StyleSheet, View } from "react-native";
import DisplayCard from "../components/DisplayCard";
import { searchAll } from "../utils/SearchFunctions";
export default function Category({ route }) {
  const { cards, searchTags, searchStr } = route.params;
  const [cardsOfThisCategory, setCardsOfThisCategory] = useState();
  useEffect(() => {
    setCardsOfThisCategory((prev) =>
      searchAll(cards, searchStr || "", searchTags)
    );
  }, [cards]);

  const Cards = [];

  if (cardsOfThisCategory && Object.keys(cardsOfThisCategory).length) {
    for (let [key, value] of Object.entries(cardsOfThisCategory)) {
      Cards.push(
        <DisplayCard
          cardId={key}
          name={value.name}
          description={value.description}
          uri={value.uri}
          key={key}
          ingredients={value.ingredients}
          tags={value.tags}
          setCards={setCardsOfThisCategory}
        />
      );
    }
  }
  return (
    <Container>
      <Content>{Cards}</Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
