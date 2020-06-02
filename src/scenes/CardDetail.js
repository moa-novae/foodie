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
import { TabView, TabBar } from "react-native-tab-view";
import { theme } from "../styles/theme";

const Description = (props) => (
  <Text style={styles.tabContainer}>{props.description}</Text>
);

const Ingredients = (props) => (
  <Text style={styles.tabContainer}>{props.ingredients.join("\n")}</Text>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function ({ route, navigation }) {
  const { setCards, card } = route.params;
  const { cardId, description, ingredients, name, tags, uri, rating } = card;

  const Tags = tags.map((tag) => (
    <Button rounded style={{ margin: 5 }} key={tag} style={styles.tag}>
      <Text>{tag}</Text>
    </Button>
  ));

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "description", title: "Description" },
    { key: "ingredient", title: "Ingredients" },
  ]);

  //for tab view
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "description":
        return <Description description={description} />;
      case "ingredient":
        return <Ingredients ingredients={ingredients} />;
    }
  };
  //for tab view
  const renderTabBar = (props) => (
    <TabBar {...props} style={{ backgroundColor: theme.colors.primary }} />
  );

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
                <Text>
                  {" "}
                  {capitalizeAsTitle(name && characterSwap(name, "_", " "))}
                </Text>
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
          <ListItem
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingHorizontal: 5,
            }}
          >
            {Tags}
          </ListItem>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
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
  tag: {
    backgroundColor: theme.colors.button,
    color: "#f2f2f2",
    margin: 5,
  },
  tabContainer: {
    margin: 20,
    paddingHorizontal: 10,
    lineHeight: 26,
    fontSize: 18,
  },
});
