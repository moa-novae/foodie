import React, { useState } from "react";
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  Icon,
  List,
  ListItem,
} from "native-base";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { uniqueId } from "../utils/uniqueId";
import { saveToLocal } from "../utils/infoSaver";

const filterData = function (query, dataSet) {
  const output = [];
  dataSet.forEach((data) => {
    if (data.includes(query.trim().toLowerCase())) {
      output.push(data);
    }
  });
  return output;
};

export default function ({ route, navigation }) {
  const [newCategory, setNewCategory] = useState({
    name: null,
    tags: [],
    icon: "hamburger",
    iconColor: "red",
  });
  const { allTags, setCategories } = route.params;
  const [tagQuery, setTagQuery] = useState("");

  const [showAutoComplete, setShowAutoComplete] = useState(false);

  let tags;
  if (newCategory && newCategory.tags) {
    tags = newCategory.tags.map((tag, index) => (
      <Button iconRight rounded style={{ margin: 5 }} key={`${tag}: ${index}`}>
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
                        if (!newState.tags.includes(tagQuery))
                          newState.tags.push(tagQuery);
                        return newState;
                      });
                      setTagQuery((prev) => null);
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
                    setShowAutoComplete((prev) => false);
                    setTagQuery((prev) => item);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Item>
          <Item
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {tags}
          </Item>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
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
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
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
        <Button onPress={() => console.log("new category", newCategory)}>
          <Text>Print current Form</Text>
        </Button>
        <Button
          onPress={() => {
            const toBeSavedCategory = { [uniqueId()]: newCategory };
            setCategories((prev) => ({ ...prev, ...toBeSavedCategory }));
            saveToLocal("categories", toBeSavedCategory);
            navigation.goBack();
          }}
        >
          <Text>Save current Form</Text>
        </Button>
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
});
