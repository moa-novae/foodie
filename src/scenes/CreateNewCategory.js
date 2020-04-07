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
} from "native-base";
import { View } from "react-native";

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

export default function () {
  const [newCategory, setNewCategory] = useState({
    iconColor: "",
    name: "",
    icon: "",
  });
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
        type="FontAwesome5"
        onPress={() => setNewCategory((prev) => ({ ...prev, icon }))}
        style={{ color: newCategory.iconColor }}
      />
    </Button>
  ));
  return (
    <Container>
      <Content>
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
