import { Container, Card, CardItem, Body, Content, Text } from "native-base";
import React from "react";
import ReactNative from "react-native";
import { StyleSheet, View } from "react-native";
import DisplayCard from "../components/DisplayCard";

export default function Category({ route }) {
  const { categoryItems, setCards } = route.params;
  const Cards = [];
  for (let [key, value] of Object.entries(categoryItems)) {
    
    Cards.push(
      <DisplayCard
        cardId={key}
        name={value.name}
        description={value.description}
        uri={value.uri}
        key={key}
        ingredients={value.ingredients}
        tags={value.tags}
        setCards={setCards}
      />
    );
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
    justifyContent: "center"
  }
});
