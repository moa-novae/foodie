import {
  Container,
  Content,
  Icon,
  Button,
  Footer,
  Text,
} from "native-base";
import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import ListBody from "../components/ListBody";
import ShowAll from "../components/ShowAll";
import {
  readFromLocal,
  deleteCategoryFromLocal,
} from "../utils/infoSaver";
import { theme } from '../styles/theme'

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
  //function for closing row slider
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const renderCategoryItem = (data, rowMap) => {
    return (
      <>
        {data.item.category && (
          <ListBody
            key={data.item.key}
            category={data.item.category}
            navigation={data.item.navigation}
            cards={data.item.cards}
            setCards={data.item.setCards}
            closeRow={() => closeRow(rowMap, data.item.key)}
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
  //fn for onPress edit button
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
  //render buttons underneath the category slider
  const renderHiddenCategoryItem = (data, rowMap) => (
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
        onPress={() => {
          closeRow(rowMap, data.item.key);
          editCategory(
            data.item.category,
            data.item.categoryId,
            data.item.allTags,
            data.item.navigation
          );
        }}
      >
        <Icon
          style={{ fontSize: 20, color: "white" }}
          name="edit"
          type="AntDesign"
        />
      </TouchableOpacity>
    </View>
  );
  const Tip = function () {
    return (
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          Try and create a new category! Category will filter items that share
          the same set of tags.
        </Text>
      </View>
    );
  };

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
    <Container>
      <Content>
        <SwipeListView
          data={categoriesList}
          renderItem={renderCategoryItem}
          renderHiddenItem={renderHiddenCategoryItem}
          leftOpenValue={100}
          previewRowKey={"0"}
          disableLeftSwipe
        />
        <ShowAll navigation={navigation} cards={cards} setCards={setCards} />
        {!categoriesList.length && <Tip />}
        {/* dev options */}
        {/* <Button
          onPress={() => {
            readFromLocal("cards").then(console.log);
          }}
        >
          <Text>Show Local</Text>
        </Button>
        <Button
          onPress={() => {
            readFromLocal("categories").then(console.log);
          }}
        >
          <Text>Category</Text>
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
        </Button> */}
      </Content>
      <Footer
        style={{
          backgroundColor: theme.colors.background,
          paddingLeft: 15,
          height: 60,
          paddingRight: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
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
              style={{ color: theme.colors.primary }}
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
        </View>
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
  tipContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
    height: 400,
    flex: 1,
    justifyContent: "center",
    color: "#c9c9c9",
  },
  tipText: {
    color: "#8f8f8f",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
  },
});
