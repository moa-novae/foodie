import {
  Container,
  Card,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem
} from "native-base";
import React from "react";
import ReactNative from "react-native";
import { StyleSheet, View } from "react-native";
import ListHeader from "../components/ListHeader";
import ListBody from "../components/ListBody";
import Tag from "../components/Tag";

const testArr = [
  { name: "Food", icon: "utensils" },
  { name: "Drinks", icon: "wine-glass" }
];
const meals = ["Dinner", "Lunch", "Breakfast"];
const testTags = [
  "Tasty",
  "Spicy",
  "Sour",
  "Cheap",
  "Fast",
  "Mexican",
  "Late Night",
  "Morning"
];

export default function Home({ navigation }) {
  const categoriesList = testArr.map((category, index) => (
    <ListBody key={index} text={category.name} icon={category.icon} />
  ));
  const tags = testTags.map((tag, index) => <Tag key={index} text={tag} />);

  //modify header of react navigation
  //done here to have correct this context and interact with home scene
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //         <Icon
  //           style={{ marginLeft: 10, marginRight: 10, fontSize: 30 }}
  //           name="list-ul"
  //           type="FontAwesome5"
  //           onPress={() => alert("Placeholder")}
  //         />
  //     )
  //   });
  // }, [navigation]);

  return (
    <Container>
      <Content>
        <List>
          <ListHeader text="Food" />
          {categoriesList}
          <ListHeader text="Meal" />
          <ListItem style={styles.tags}>{tags}</ListItem>
        </List>
      </Content>

      <Footer>
        <FooterTab>
          <Button full onPress={() => navigation.navigate("Category")}>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 0
  },
  tags: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
