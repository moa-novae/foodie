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
  const { uri, name, description, rating, tags, ingredients } = props.card;
  return (
    <ListItem
      thumbnail
      style={{ marginVertical: 10 }}
      onPress={() =>
        props.navigation.navigate("CardDetail", { card: props.card })
      }
    >
      <Left>
        <Thumbnail
          resizeMode="cover"
          source={{ uri }}
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
          <Text>{name && characterSwap(name, "_", " ")}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Rating readonly startingValue={rating} imageSize={20} />
          <Text style={{ marginHorizontal: 5, fontSize: 20, color: "#f1c40f" }}>
            {rating}/5
          </Text>
        </View>
      </View>
    </ListItem>
  );
}
