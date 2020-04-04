import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput
} from "react-native";
import { Form, Item, Input, Icon } from "native-base";
import { readFromLocal } from "../utils/infoSaver";
import Tag from "../components/Tag";
import SearchBar from "../components/SearchBar";
import {searchAll} from '../utils/SearchFunctions'
import { useFocusEffect } from "@react-navigation/native";

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



export default function HalfModal({ navigation }) {
  const initialTagsSelected = {};
  testTags.forEach(tag => (initialTagsSelected[tag] = false));
  const [tagSelected, setTagSelected] = useState(initialTagsSelected);
  const [searchTerm, setSearchTerm] = useState('')
  const [cards, setCards] = useState({});
  const tags = testTags.map((tag, index) => (
    <Tag
      key={index}
      text={tag}
      setTagSelected={setTagSelected}
      tagSelected={tagSelected}
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
    
    const onSearch = (searchStr) => {
      setSearchTerm(prev => searchStr)
      const output = searchAll(cards, searchStr, tagSelected)
      console.log('output', output)
      return output
  
    }
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
          <SearchBar onSearch={onSearch}/>
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
    flexWrap: "wrap"
  },
  button: {
    width: 200,
    height: 50
  }
});
