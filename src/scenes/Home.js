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
import {
  saveToLocal,
  readFromLocal,
  deleteCategoryFromLocal,
} from "../utils/infoSaver";
import { uniqueId } from "../utils/uniqueId";
import { sampleData, sampleCategories } from "../assets/sampleData";

export default function Home({ navigation }) {
  const [cards, setCards] = useState({});
  const [allTags, setAllTags] = useState([]);
  const [categories, setCategories] = useState();
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
        allTags,
      });
    }
  }
  const renderCategoryItem = (data) => {
    return (
      <>
        {data.item.category && (
          <ListBody
            key={data.item.key}
            category={data.item.category}
            navigation={data.item.navigation}
            cards={data.item.cards}
            setCards={data.item.setCards}
          />
        )}
      </>
    );
  };
  const deleteCategory = function (categoryId) {
    setCategories((prev) => {
      const newCategories = { ...prev };
      delete newCategories[categoryId];
      return newCategories;
    });
    //delete category from local storage
    deleteCategoryFromLocal(categoryId);
  };

  const editCategory = function (category, categoryId, allTags, navigation) {
    navigation.navigate("CreateNewCategory", {
      screen: "CreateNewCategory",
      params: {
        category,
        categoryId,
        allTags,
        setCategories,
      },
    });
  };
    
    const renderHiddenCategoryItem = (data) => (
    <View key={data.item.key} style={styles.sliderButtonsContainer}>
      <TouchableOpacity
        style={styles.sliderButtonDelete}
        onPress={() => deleteCategory(data.item.categoryId)}
      >
        <Icon
          style={{ fontSize: 20, color: "white" }}
          name="delete"
          type="AntDesign"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sliderButtonEdit}
        onPress={() =>
          editCategory(
            data.item.category,
            data.item.categoryId,
            data.item.allTags,
            data.item.navigation
          )
        }
      >
        <Icon
          style={{ fontSize: 20, color: "white" }}
          name="edit"
          type="AntDesign"
        />
      </TouchableOpacity>
    </View>
  );
  //Upon focus, fetch local data on cards
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

  //Upon focus, fetch local data on categories
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
  //update all tags used whenever cards state change
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
        <View>
          <SwipeListView
            data={categoriesList}
            renderItem={renderCategoryItem}
            renderHiddenItem={renderHiddenCategoryItem}
            leftOpenValue={100}
            previewRowKey={"0"}
            disableLeftSwipe
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
          full
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
          full
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

const styles = StyleSheet.create({
  sliderButtonEdit: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    backgroundColor: "#5cb85c",
    height: 44,
  },
  sliderButtonDelete: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    backgroundColor: "#d9534f",
    height: 44,
  },
  sliderButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 8,
    marginHorizontal: 18,
    width: 100,
  },
});
