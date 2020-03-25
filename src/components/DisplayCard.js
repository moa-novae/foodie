import React from "react";
import { Image } from "react-native";
import { Card, CardItem, Body, Text, Thumbnail } from "native-base";
import { characterSwap } from "../utils/textParser";
export default function(props) {
  return (
    <Card>
      <CardItem cardBody>
        <Image
          style={{ width: "100%", height: 400 }}
          resizeMode="contain"
          source={require("../assets/old_fashioned.png")}
        />
      </CardItem>
      <CardItem>
        <Text>{characterSwap(props.name, "_", " ")}</Text>
      </CardItem>
    </Card>
  );
}
