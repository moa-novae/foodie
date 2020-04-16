import React, { useState } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Text,
  Thumbnail,
  Left,
  List,
  ListItem,
} from "native-base";
import { characterSwap, capitalizeAsTitle } from "../utils/textParser";
import { deleteCard } from "../utils/infoSaver";
import { Rating } from "react-native-ratings";
import { TabView, SceneMap } from "react-native-tab-view";

const Description = (props) => (
  <Text style={{ margin: 20, lineHeight: 25 }}>{props.description}</Text>
);

const Ingredients = (props) => (
  <Text style={{ margin: 20, lineHeight: 25 }}>
    {props.ingredients.join("\n")}
  </Text>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function ({ route, navigation }) {
  const { setCards, card } = route.params;
  const { cardId, description, ingredients, name, tags, uri, rating } = card;

  const Tags = tags.map((tag, index) => (
    <Button rounded style={{ margin: 5 }} key={index}>
      <Text>{tag}</Text>
    </Button>
  ));

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "description", title: "Description" },
    { key: "ingredient", title: "Ingredients" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "description":
        return <Description description={description} />;
      case "ingredient":
        return <Ingredients ingredients={ingredients} />;
    }
  };

  return (
    <Container>
      <Content>
        <List>
          <ListItem thumbnail style={{ marginVertical: 10 }}>
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
                <Text> {capitalizeAsTitle(name && characterSwap(name, "_", " "))}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Rating readonly startingValue={rating} imageSize={20} />
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 20,
                    color: "#f1c40f",
                  }}
                >
                  {rating}/5
                </Text>
              </View>
            </View>
          </ListItem>
          {/* <View>
            <Icon name="edit" type="AntDesign" />
            <Icon
              name="delete"
              type="AntDesign"
              onPress={() => {
                setCards((prev) => {
                  const newCards = { ...prev };
                  delete newCards[cardId];
                  deleteCard(cardId);
                  return newCards;
                });
              }}
            />
          </View> */}

          <ListItem
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            {Tags}
          </ListItem>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  scene: {
    flex: 1,
  },
});
