import {
  Container,
  Content,
  List,
  Fab,
  Icon,
  Button,
  Footer,
  Text,
} from "native-base";
import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity, AsyncStorage } from "react-native";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import ListHeader from "../components/ListHeader";
import ListBody from "../components/ListBody";
import Tag from "../components/Tag";
import NewButton from "../components/NewButton";
import { saveToLocal, readFromLocal } from "../utils/infoSaver";
import { uniqueId } from "../utils/uniqueId";
import { sampleData, sampleCategories } from "../assets/sampleData";

export default function Home({ navigation }) {
  const [cards, setCards] = useState({});
  const [allTags, setAllTags] = useState([]);
  const [categories, setCategories] = useState();
  console.log("categories", categories);
  const categoriesList = [];
  if (categories && Object.keys(categories).length) {
    for (let [categoryId, category] of Object.entries(categories)) {
      categoriesList.push({
        category,
        categoryId,
        navigation,
        cards,
        setCards,
        categoryId,
        key: categoryId,
      });
    }
  }
  const renderCategoryItem = (data) => {
    console.log("data category", data.item.categoryId);
    return (
      <View>
        {data.item.category && (
          <ListBody
            key={data.item.key}
            category={data.item.category}
            navigation={data.item.navigation}
            cards={data.item.cards}
            setCards={data.item.setCards}
          />
        )}
      </View>
    );
  };
  const renderHiddenCategoryItem = () => (
    <Button>
      <Text>Hello</Text>
    </Button>
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchNewCards = async () => {
        const newCards = await readFromLocal("cards");
        if (isActive) {
          setCards((prev) => JSON.parse(newCards));
        }
      };
      const fetchCategories = async () => {
        const updatedCategories = await readFromLocal("categories");
      };
      fetchNewCards();
      return () => {
        isActive = false;
      };
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchCategories = async () => {
        const updatedCategories = await readFromLocal("categories");
        if (isActive) {
          setCategories((prev) => JSON.parse(updatedCategories));
        }
      };
      fetchCategories();
      return () => {
        isActive = false;
      };
    }, [])
  );

  useEffect(() => {
    const availabeTags = [];
    if (cards && Object.keys(cards).length) {
      for (let [cardId, cardValue] of Object.entries(cards)) {
        for (let tag of cardValue.tags) {
          if (!availabeTags.includes(tag)) {
            availabeTags.push(tag);
          }
        }
      }
    }
    setAllTags((prev) => availabeTags);
  }, [cards]);

  return (
    <Container style={{ backgroundColor: "#ffffff" }}>
      <Content>
        {/* <List>{categoriesList}</List> */}
        <View>
          <SwipeListView
            data={categoriesList}
            renderItem={renderCategoryItem}
            renderHiddenItem={renderHiddenCategoryItem}
            leftOpenValue={75}
            previewRowKey={"0"}
            disableLeftSwipe
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </View>
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
            saveToLocal("categories", { ...sampleCategories });
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
          onPress={() =>
            navigation.navigate("CreateNewCategory", {
              screen: "CreateNewCategory",
              params: { allTags, setCategories: setCategories },
            })
          }
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
