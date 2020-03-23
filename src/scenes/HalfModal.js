import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput
} from "react-native";
import { Form, Item, Input, Icon } from "native-base";
import Tag from "../components/Tag";
import SearchBar from "../components/SearchBar";

const testTags = [
  "Tasty",
  "Spicy",
  "Sour",
  "Cheap",
  "Fast",
  "Mexican",
  "Late Night",
  "Morning"
];

const sampleData = {
  white_russian: {
    rating: 4.5,
    ingredients: ["heavy cream", "vodka", "coffee liqueur"],
    tags: ["cocktail", "evening", "drinks", "creamy"]
  },
  old_fashioned: {
    rating: 4.7,
    ingredients: ["rye", "bourbon", "angostura bitters", "orange twist"],
    tags: ["cocktail", "evening", "drinks", "citrus"]
  },
  whiskey_sour: {
    rating: 5,
    ingredients: ["whiskey", "lemon juice", "sugar"],
    tags: ["fast", "cocktail", "evening", "citrus"]
  }
};

export default function HalfModal({ navigation }) {
  const initialTagsSelected = {};
  testTags.forEach(tag => (initialTagsSelected[tag] = false));
  const [tagSelected, setTagSelected] = useState(initialTagsSelected);
  const tags = testTags.map((tag, index) => (
    <Tag
      key={index}
      text={tag}
      setTagSelected={setTagSelected}
      tagSelected={tagSelected}
    />
  ));

  return (
    // when clicked outside of the modal, go back to the homepage
    <TouchableOpacity
      style={{
        height: "100%",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        opacity: 0.9
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
            justifyContent: "center"
          }}
        >
          <SearchBar />
          <View style={styles.tags}>{tags}</View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tags: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    width: 200,
    height: 50
  }
});
