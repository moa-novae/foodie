import { Container, Content, List, Fab, Icon, Button } from "native-base";
import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity, Text, AsyncStorage } from "react-native";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ListHeader from "../components/ListHeader";
import ListBody from "../components/ListBody";
import Tag from "../components/Tag";
import NewButton from "../components/NewButton";
import { readFromLocal } from "../utils/infoSaver";
import { categoryFinder } from "../utils/SearchFunctions";

const testArr = [
  { name: "Food", icon: "utensils" },
  { name: "Drinks", icon: "wine-glass" }
];
const meals = ["Dinner", "Lunch", "Breakfast"];

export default function Home({ navigation }) {
  const [cards, setCards] = useState({});
  const categoriesList = testArr.map((category, index) => (
    <ListBody
      key={index}
      text={category.name}
      icon={category.icon}
      navigation={navigation}
      cards={categoryFinder(cards, category.name.toLowerCase())}
    />
  ));

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchNewCards = async () => {
        const newCards = await readFromLocal("cards");
        if (isActive) {
          setCards(prev => JSON.parse(newCards));
        }
      };
      fetchNewCards();
      return () => {
        isActive = false;
      };
    }, [])
  );
  return (
    <Container style={{ backgroundColor: "#ffffff" }}>
      <Content>
        <List>
          <ListHeader text="Food" />
          {categoriesList}
        </List>
        <Button
          onPress={() => {
            readFromLocal("cards").then(console.log);
          }}
        >
          <Text>Test</Text>
        </Button>
        <Button
          onPress={() => {
            AsyncStorage.clear();
          }}
        >
          <Text>Clear</Text>
        </Button>
      </Content>
      <NewButton navigation={navigation} />
    </Container>
  );
}
