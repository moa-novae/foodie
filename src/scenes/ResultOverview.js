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
import DisplayCard from "../components/DisplayCard";
import { searchAll } from "../utils/SearchFunctions";

export default function ({ route }) {
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
        <ResultOverviewItem
          cardId={key}
          name={value.name}
          description={value.description}
          uri={value.uri}
          key={key}
          ingredients={value.ingredients}
          rating={value.rating}
          tags={value.tags}
          setCards={setCardsOfThisCategory}
        />
      );
    }
  }
  return (
    <Container>
      <Content>
        <List>{Cards}</List>
      </Content>
    </Container>
  );
}
