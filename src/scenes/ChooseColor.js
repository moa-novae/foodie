import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "native-base";
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

export default function ({ route, navigation }) {
  const { setNewCategory } = route.params;
  const buttons = sampleColor.map((color, index) => (
    <Button
      style={{ backgroundColor: color, width: 60, height: 40, margin: 3 }}
      onPress={() => setNewCategory((prev) => ({ ...prev, iconColor: color }))}
      onPressOut={() => {
        navigation.goBack();
      }}
      key={index}
    />
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
            {buttons}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
}
