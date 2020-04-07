import {
  Container,
  Content,
  List,
  Fab,
  Icon,
  Button,
  Footer,
} from "native-base";
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
  { name: "Drinks", icon: "wine-glass" },
];
const meals = ["Dinner", "Lunch", "Breakfast"];

export default function Home({ navigation }) {
  const [cards, setCards] = useState({});
  const categoriesList = testArr.map((category, index) => {
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
          setCards((prev) => JSON.parse(newCards));
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
        <List>{categoriesList}</List>
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
      <Footer
        style={{
          backgroundColor: "#ffff",
          position: "absolute",
          flex: 1,
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <Button
          transparent
          iconRight
          onPress={() => navigation.navigate("CreateNewCategory")}
        >
          <Icon
            name="addfolder"
            style={{ color: "#2164ff" }}
            type="AntDesign"
          />
          <Text>New Category</Text>
        </Button>
        <Button
          transparent
          iconRight
          onPress={() => navigation.navigate("CreateNew")}
        >
          <Icon name="plus" type="AntDesign" />
        </Button>
      </Footer>
    </Container>
  );
}
