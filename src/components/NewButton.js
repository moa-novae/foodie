import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "native-base";
export default function({ navigation }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#1f2232",
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 70,
        borderRadius: 70,
        position: "absolute",
        bottom: 20,
        right: 20
      }}
      onPress={() => navigation.navigate("CreateNew")}
    >
      <Icon name="plus" type="FontAwesome5" style={{ color: "white" }} />
    </TouchableOpacity>
  );
}
