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
import { View, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

const sampleColor = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "olive",
  "cyan",
  "aquamarine",
  "turquoise",
  "teal",
  "blue",
  "navy",
  "indigo",
  "purple",
  "magenta",
  "violet",
  "tan",
  "brown",
  "maroon",
  // "white",
  "gray",
  "black",
];

const sampleIcons = [
  "hamburger",
  "bacon",
  "bone",
  "bread-slice",
  "candy-cane",
  "carrot",
  "cheese",
  "cloud-meatball",
  "cookie",
  "drumstick-bite",
  "egg",
  "fish",
  "hotdog",
  "ice-cream",
  "leaf",
  "lemon",
  "pepper-hot",
  "pizza-slice",
  "seedling",
  "stroopwafel",
];

const filterData = function (query, dataSet) {
  const output = [];
  dataSet.forEach((data) => {
    if (data.includes(query.trim().toLowerCase())) {
      output.push(data);
    }
  });
  return output;
};

export default function ({ route }) {
  const { allTags } = route.params;
  const [tagQuery, setTagQuery] = useState("");
  const [newCategory, setNewCategory] = useState({
    iconColor: null,
    name: "",
    icon: null,
    tags: [],
  });
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const buttons = sampleColor.map((color, index) => (
    <Button
      style={{ backgroundColor: color, width: 60, height: 40, margin: 3 }}
      onPress={() => setNewCategory((prev) => ({ ...prev, iconColor: color }))}
      key={index}
    />
  ));
  const foodIcons = sampleIcons.map((icon, index) => (
    <Button transparent>
      <Icon
        name={icon}
        key={index}
        type="FontAwesome5"
        onPress={() => setNewCategory((prev) => ({ ...prev, icon }))}
        style={{ color: newCategory.iconColor }}
      />
    </Button>
  ));

  const tags = newCategory.tags.map((tag) => <Text>{tag}</Text>);
  return (
    <Container>
      <Content keyboardShouldPersistTaps="always">
        <View>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                onChangeText={(text) => {
                  setNewCategory((prev) => ({ ...prev, name: text }));
                }}
                value={newCategory.name}
              />
            </Item>
          </Form>
        </View>
        <Autocomplete
          data={showAutoComplete ? filterData(tagQuery, allTags) : []}
          defaultValue={tagQuery}
          onSubmitEditing={() => {
            setNewCategory((prev) => {
              const newState = { ...prev };
              if (!newState.tags.includes(tagQuery))
                newState.tags.push(tagQuery);
              return newState;
            });
          }}
          onChangeText={(query) => {
            setShowAutoComplete((prev) => true);
            setTagQuery((prev) => query);
          }}
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
        {tags}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text>Selected Color</Text>
          <Button
            style={{
              backgroundColor: newCategory.iconColor,
              width: 60,
              height: 40,
              margin: 3,
            }}
          />
        </View>
        <Text>Pick a color</Text>

        <View style={{ flexGrow: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {buttons}
        </View>
        <Text>Pick an Icon</Text>
        <Icon
          name={newCategory.icon}
          type="FontAwesome5"
          style={{ color: newCategory.iconColor }}
        />
        <View style={{ flexGrow: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {foodIcons}
        </View>
      </Content>
    </Container>
  );
}
