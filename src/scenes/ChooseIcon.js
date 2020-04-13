import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon } from "native-base";
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

export default function ({ route, navigation }) {
  const { setNewCategory, newCategory } = route.params;
  const foodIcons = sampleIcons.map((icon, index) => (
    <Button
      transparent
      onPress={() => setNewCategory((prev) => ({ ...prev, icon }))}
      onPressOut={() => {
        navigation.goBack();
      }}
    >
      <Icon
        name={icon}
        key={index}
        type="FontAwesome5"
        style={{ color: newCategory.iconColor }}
      />
    </Button>
  ));
  return (
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
            height: "40%",
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {foodIcons}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
}
