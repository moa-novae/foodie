import React from "react";
import { View } from "react-native";
import {
  Content,
  Container,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { characterSwap, arrToString } from "../utils/textParser";
import { Rating } from "react-native-ratings";
export default function (props) {
  return (
    <ListItem thumbnail style={{ marginVertical: 10 }}>
      <Left>
        <Thumbnail
          resizeMode="cover"
          source={{ uri: props.uri }}
          style={{ height: 80, width: 80 }}
        />
      </Left>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          marginHorizontal: 20,
        }}
      >
        <View style={{ top: 10 }}>
          <Text>{props.name && characterSwap(props.name, "_", " ")}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Rating readonly startingValue={props.rating} imageSize={20} />
          <Text style={{ marginHorizontal: 5, fontSize: 20, color: "#f1c40f" }}>
            {props.rating}/5
          </Text>
        </View>
      </View>
    </ListItem>
  );
}
