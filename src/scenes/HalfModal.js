import React from "react";
import {
  View,
  Text,
  Button,
  Item,
  InputAccessoryView,
  Icon,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

export default function HalfModal({ navigation }) {
  return (
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
      <TouchableWithoutFeedback>
        <View
          style={{
            height: "50%",
            width: "100%",
            backgroundColor: "#fff",
            justifyContent: "center"
          }}
        >
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
}
