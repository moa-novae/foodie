import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Asyncstorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Label,
  Form,
  Input,
  Icon,
  Button,
} from "native-base";
import { TouchableOpacity, ScrollView, View, Image } from "react-native";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Rating } from "react-native-ratings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MultiField from "../components/MultiField";
import Tag from "../components/addTags";
import PhotoSelection from "../components/PhotoSelection";
import { saveToLocal, deleteCard } from "../utils/infoSaver";
import { uniqueId } from "../utils/uniqueId";

export default function ({ navigation, route }) {
  let card;
  let cardId;
  let oldTag = {};
  let oldIngredients = {};
  if (route.params?.card && route.params?.cardId) {
    ({ card, cardId } = route.params);
    card.tags.forEach((tag) => {
      oldTag[uniqueId()] = tag;
    });
    card.ingredients.forEach((ingredient) => {
      oldIngredients[uniqueId()] = ingredient;
    });
  }
  // initial state if in edit mode
  const initialState = {
    name: card ? card.name : "",
    rating: card ? card.rating : 2.5,
    description: card ? card.description : "",
    uri: card ? card.uri : null,
    tags: Object.keys(oldTag).length ? oldTag : { [uniqueId()]: "" },
    ingredients: Object.keys(oldIngredients).length
      ? oldIngredients
      : { [uniqueId()]: "" },
  };
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState({
    name: null,
    ingredients: null,
  });
  const [canSubmit, setCanSubmit] = useState(false);

  //check to see if error present
  useEffect(() => {
    if (!Object.values(error).filter((val) => !!val).length) {
      setCanSubmit((prev) => false);
    } else {
      setCanSubmit((prev) => true);
    }
  }, [error]);
  return (
    <Container>
      <Content>
        <KeyboardAwareScrollView
          enableAutomaticScroll
          extraScrollHeight={10}
          enableOnAndroid={true}
          extraHeight={Platform.select({ android: 100 })}
          enableAutomaticScroll={Platform.OS === "ios"}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          <Form
            style={{
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 15,
              minHeight: 50,
            }}
          >
            <Item regular style={styles.textField} error={!!error.name}>
              <Input
                onChangeText={(text) => {
                  setForm((prev) => ({ ...prev, name: text }));
                }}
                value={form.name}
                placeholder="Name"
                onBlur={() => validationErrors(form, setError)}
              />
            </Item>
            <Text style={{ color: "red" }}>{error.name}</Text>
            <Item regular style={styles.textField}>
              <Input
                onChangeText={(description) => {
                  setForm((prev) => ({ ...prev, description }));
                }}
                value={form.description}
                placeholder="Description"
                multiline
              />
            </Item>
            <Item style={{ borderColor: "transparent" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Rating
                  imageSize={40}
                  fractions={1}
                  onFinishRating={(rating) => {
                    setForm((prev) => ({ ...prev, rating }));
                  }}
                  style={{ margin: 5 }}
                  startingValue={form.rating}
                />
                <Text style={{ margin: 5, fontSize: 20, color: "#f1c40f" }}>
                  {form.rating}/5
                </Text>
              </View>
            </Item>
            <MultiField
              setForm={setForm}
              form={form}
              placeholder="Ingredient"
              title="Ingredients"
              formKey="ingredients"
              errorMsg={error.ingredients}
              validationErrors={() => validationErrors(form, setError)}
            />
            <MultiField
              setForm={setForm}
              form={form}
              placeholder="Tag"
              title="Tags"
              formKey="tags"
            />
            <PhotoSelection
              form={form}
              setForm={setForm}
              navigation={navigation}
            />
          </Form>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              danger
              style={styles.saveButton}
              onPress={() => {
                deleteCard(cardId);
                navigation.navigate("Home");
              }}
            >
              <Text>Delete</Text>
            </Button>
            <Button
              onPress={() => {
                saveFormToStorage(cardId, form, navigation);
              }}
              disabled={!canSubmit}
              style={styles.saveButton}
            >
              <Icon name="save" type="AntDesign" />
              <Text>Save Food</Text>
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </Content>
    </Container>
  );
}

const saveFormToStorage = function (cardId, form, navigation) {
  const newCardId = cardId || uniqueId();
  const newCard = { [newCardId]: { ...form, cardId } };
  //in the form state, tags/ingredients are stored as object. It is then converted to an array
  const tagArr = [];
  const ingredientArr = [];
  //convert tags & inredients in form, stored as object, to array
  for (let [tagId, tag] of Object.entries(newCard[newCardId].tags)) {
    tagArr.push(tag);
  }
  for (let [ingredientId, ingredient] of Object.entries(
    newCard[newCardId].ingredients
  )) {
    ingredientArr.push(ingredient);
  }
  newCard[newCardId].ingredients = ingredientArr;
  newCard[newCardId].tags = tagArr;
  saveToLocal("cards", newCard);
  navigation.navigate("Home");
};

const validationErrors = function (form, setError) {
  if (!form?.name || !form?.name?.length) {
    setError((prev) => ({ ...prev, name: "Please enter a name!" }));
  } else if (form?.name?.length) {
    setError((prev) => ({ ...prev, name: null }));
  }
  //check if at least one ingredient is filled
  if (
    !form.ingredients ||
    !Object.values(form?.ingredients).filter((ingredient) => ingredient.length)
      .length
  ) {
    setError((prev) => ({
      ...prev,
      ingredients: "Please add at least one ingredient!",
    }));
  } else if (
    Object.values(form?.ingredients).filter((ingredient) => ingredient.length)
  ) {
    setError((prev) => ({
      ...prev,
      ingredients: null,
    }));
  }
};

const styles = StyleSheet.create({
  textField: {
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    minHeight: 50,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
  },
});
