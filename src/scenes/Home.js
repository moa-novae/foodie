import { Container, Content, List, Fab, Icon, Button } from "native-base";
import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity, Text, AsyncStorage } from "react-native";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ListHeader from "../components/ListHeader";
import ListBody from "../components/ListBody";
import Tag from "../components/Tag";
import NewButton from "../components/NewButton";
import { saveToLocal, readFromLocal } from "../utils/infoSaver";
import { categoryFinder } from "../utils/SearchFunctions";
import { sampleData } from "../assets/sampleData";

const testArr = [
  { name: "Food", icon: "utensils" },
  { name: "Drinks", icon: "wine-glass" }
];
const meals = ["Dinner", "Lunch", "Breakfast"];

export default function Home({ navigation }) {
  const [cards, setCards] = useState({});
  const categoriesList = testArr.map((category, index) => {
    console.log(
      "pass to cat",
      categoryFinder(cards, category.name.toLowerCase())
    );
    return (
      <ListBody
        key={index}
        text={category.name}
        icon={category.icon}
        navigation={navigation}
        cards={categoryFinder(cards, category.name.toLowerCase())}
      />
    );
  });
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
          <Text>Show Local</Text>
        </Button>
        <Button
          onPress={() => {
            AsyncStorage.clear();
          }}
        >
          <Text>Clear</Text>
        </Button>
        <Button
          onPress={() => {
            saveToLocal("cards", { ...sampleData });
          }}
        >
          <Text>Seed with Sample Data</Text>
        </Button>
      </Content>
      <NewButton navigation={navigation} />
    </Container>
  );
}
