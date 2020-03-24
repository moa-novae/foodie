import { Container, Card, CardItem, Body, Content, Text } from "native-base";
import React from "react";
import ReactNative from "react-native";
import { StyleSheet, View } from "react-native";
import ItemCard from "../components/CardItem";

export default function Category({ route }) {
  const { categoryItems } = route.params;
  return (
    <Container>
      <Content>
        <Text>{JSON.stringify(categoryItems)}</Text>
      </Content>
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
