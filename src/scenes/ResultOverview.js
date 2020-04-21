import React, { useState, useEffect } from "react";
import ResultOverviewItem from "../components/ResultOverviewItem";
import {
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Text,
  List,
} from "native-base";
import { View, StyleSheet } from "react-native";
import DisplayCard from "../components/DisplayCard";
import { searchAll } from "../utils/SearchFunctions";

export default function ({ route, navigation }) {
  const { cards, searchTags, searchStr, setCards } = route.params;
  const [cardsOfThisCategory, setCardsOfThisCategory] = useState();

  useEffect(() => {
    console.log(searchTags);
    setCardsOfThisCategory((prev) =>
      searchAll(cards, searchStr || "", searchTags || [])
    );
  }, [cards]);
  const EmptyResult = function () {
    return (
      <View style={styles.noResultContainer}>
        <Text style={styles.noResultText}>No food found!</Text>
      </View>
    );
  };
  const Cards = [];
  if (cardsOfThisCategory && Object.keys(cardsOfThisCategory).length) {
    for (let [cardId, card] of Object.entries(cardsOfThisCategory)) {
      Cards.push(
        <ResultOverviewItem
          cardId={cardId}
          card={card}
          key={cardId}
          setCardsOfThisCategory={setCardsOfThisCategory}
          setCards={setCards}
          navigation={navigation}
        />
      );
    }
  }
  return (
    <Container>
      <Content>
        <List>{Cards}</List>
        {!Cards.length && <EmptyResult />}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  noResultContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
    height: 400,
    flex: 1,
    justifyContent: "center",
    color: "#c9c9c9",
  },
  noResultText: {
    color: "#8f8f8f",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
  },
});
