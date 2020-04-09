import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from "react-native";
import { Form, Item, Input, Icon } from "native-base";
import { readFromLocal } from "../utils/infoSaver";
import Tag from "../components/Tag";
import SearchBar from "../components/SearchBar";
import { searchAll } from "../utils/SearchFunctions";
import { useFocusEffect } from "@react-navigation/native";

const testTags = [
  "Tasty",
  "Spicy",
  "Sour",
  "Cheap",
  "Fast",
  "Mexican",
  "Late Night",
  "Morning",
];

export default function HalfModal({ navigation }) {
  const [tagSelected, setTagSelected] = useState({});
  const [cards, setCards] = useState({});
  const [availableTags, setAvailableTags] = useState();
  let tags = [];
  if (availableTags && availableTags.length) {
    tags = availableTags.map((tag, index) => (
      <Tag
        key={index}
        text={tag}
        setTagSelected={setTagSelected}
        tagSelected={tagSelected}
      />
    ));
  }

  useEffect(() => {
    let tagCounter = {};
    for (let [cardId, cardValue] of Object.entries(cards)) {
      cardValue.tags.forEach((tag) => {
        if (tagCounter[tag]) {
          tagCounter[tag]++;
        } else {
          tagCounter[tag] = 1;
        }
      });
    }
    const tagCounterArr = Object.entries(tagCounter);
    const sortedTagCounterArr = tagCounterArr.sort(function (a, b) {
      return b[1] - a[1];
    });
    console.log("sortedTag", sortedTagCounterArr);
    const sortedTagDesc = sortedTagCounterArr.map(
      (tagCounter) => tagCounter[0]
    );
    setAvailableTags((prev) => [...sortedTagDesc]);
  }, [cards]);

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

  //onSearch used to fetch searchStr from child searchbar
  const onSearch = (searchStr) => {
    // Convert tagSelected which is an object, to an array
    let searchTags = [];
    console.log("onSearch", tagSelected);
    for (let [tag, bool] of Object.entries(tagSelected)) {
      if (bool) searchTags.push(tag);
    }
    navigation.navigate("Category", { cards, searchStr, searchTags });
    // console.log('output', output)
  };
  return (
    // when clicked outside of the modal, go back to the homepage
    <TouchableOpacity
      style={{
        height: "100%",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        opacity: 0.9,
      }}
      activeOpacity={1}
      onPressOut={() => {
        navigation.goBack();
      }}
    >
      {/* TouchableWithoutFeedback is the actual modal */}
      <TouchableWithoutFeedback>
        <View
          style={{
            height: "70%",
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center",
          }}
        >
          <SearchBar onSearch={onSearch} />
          <View style={styles.tags}>{tags}</View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tags: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: 200,
    height: 50,
  },
});
