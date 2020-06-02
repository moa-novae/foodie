import React, { useState, useEffect } from "react";
import { Container, Text, Button, Form, Item, Input, Icon } from "native-base";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { uniqueId } from "../utils/uniqueId";
import { saveToLocal } from "../utils/infoSaver";
import { theme } from "../styles/theme";
const filterData = function (query, dataSet) {
  const output = [];
  dataSet.forEach((data) => {
    if (data.includes(query.trim().toLowerCase())) {
      output.push(data);
    }
  });
  return output;
};

//This component is used for editing and creating new categories
export default function ({ route, navigation }) {
  let category, categoryId;
  if (route.params?.category && route.params?.categoryId) {
    ({ category, categoryId } = route.params);
  }
  //category is passed as params when this component is used to edit a category
  //When editing, the form is filled with info from the category being edited
  const initialState = {
    name: category ? category.name : "",
    tags: category ? category.tags : [],
    icon: category ? category.icon : "hamburger",
    iconColor: "red",
  };
  const [newCategory, setNewCategory] = useState(initialState);
  const { allTags, setCategories } = route.params;
  //TagQuery linked with autocomplete
  const [tagQuery, setTagQuery] = useState("");

  const [showAutoComplete, setShowAutoComplete] = useState(false);

  let tags;
  if (newCategory && newCategory.tags) {
    tags = newCategory.tags.map((tag, index) => (
      <Button
        iconRight
        rounded
        style={{ margin: 5, backgroundColor: theme.colors.button }}
        key={tag}
      >
        <Text>{tag}</Text>
        <Icon
          name="delete"
          type="AntDesign"
          onPress={() => {
            setNewCategory((prev) => {
              const output = { ...prev };
              output.tags.splice(index, 1);
              return output;
            });
          }}
        />
      </Button>
    ));
  }

  //Clear suggest list if input is empty
  useEffect(() => {
    if (!tagQuery) {
      setShowAutoComplete((prev) => false);
    }
  }, [tagQuery]);
  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="always">
        <Form
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginHorizontal: 20,
            marginVertical: 15,
            minHeight: 50,
          }}
        >
          <Item regular style={styles.textField}>
            <Input
              onChangeText={(text) => {
                setNewCategory((prev) => ({ ...prev, name: text }));
              }}
              value={newCategory.name}
              placeholder="Name"
            />
          </Item>
          <Item regular>
            <Autocomplete
              renderTextInput={() => (
                <Input
                  style={{ backgroundColor: "#f0f0f0", minHeight: 50 }}
                  value={tagQuery}
                  placeholder="Search Tag Here"
                  defaultValue=""
                  onSubmitEditing={() => {
                    if (tagQuery) {
                      setNewCategory((prev) => {
                        const newState = { ...prev };
                        if (!newState.tags.includes(tagQuery.toLowerCase()))
                          newState.tags.push(tagQuery.toLowerCase());
                        return newState;
                      });
                      setTagQuery((prev) => "");
                    }
                  }}
                  onChangeText={(query) => {
                    setTagQuery((prev) => query);
                    setShowAutoComplete((prev) => true);
                  }}
                />
              )}
              inputContainerStyle={{ borderColor: "transparent" }}
              listStyle={{ margin: 10, borderColor: "transparent" }}
              data={showAutoComplete ? filterData(tagQuery, allTags) : []}
              defaultValue={tagQuery}
              renderItem={({ item, i }) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    //hide suggest window
                    setShowAutoComplete((prev) => false);
                    setTagQuery((prev) => "");
                    setNewCategory((prev) => {
                      const newState = { ...prev };
                      if (!newState.tags.includes(item.toLowerCase())) {
                        newState.tags.push(item.toLowerCase());
                      }
                      return newState;
                    });
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Item>
          <View style={styles.tagsContainer}>{tags}</View>

          <View style={styles.picker}>
            <Text>Select A Color</Text>
            <Button
              style={{
                backgroundColor: newCategory.iconColor,
                width: 50,
                height: 25,
                margin: 10,
              }}
              onPress={() => {
                navigation.navigate("ChooseColor", { setNewCategory });
              }}
            />
          </View>
          <View style={styles.picker}>
            <Text>Pick an Icon</Text>
            <Icon
              name={newCategory.icon || "hamburger"}
              type="FontAwesome5"
              style={{ color: newCategory.iconColor, margin: 10 }}
              onPress={() => {
                navigation.navigate("ChooseIcon", {
                  setNewCategory,
                  newCategory,
                });
              }}
            />
          </View>
        </Form>
        <Button
          style={styles.saveButton}
          full
          onPress={() => {
            const newCategoryId = uniqueId();
            let toBeSavedCategory = {
              [categoryId || newCategoryId]: { ...newCategory },
            };
            setCategories((prev) => ({
              ...prev,
              ...toBeSavedCategory,
            }));
            saveToLocal("categories", toBeSavedCategory);
            navigation.goBack();
          }}
        >
          <Text>Save New Category</Text>
        </Button>
        {/* dev button */}
        {/* <Button
          onPress={() => {
            const newCategoryId = uniqueId();
            let toBeSavedCategory = {
              [categoryId || newCategoryId]: { ...newCategory },
            };
            setCategories((prev) => ({
              ...prev,
              ...toBeSavedCategory,
            }));
            console.log(typeof toBeSavedCategory);
          }}
        >
          <Text>Print</Text>
        </Button> */}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  textField: {
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    minHeight: 50,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    height: 50,
  },
  picker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    minHeight: 30,
    marginVertical: 10,
  },
});
