import React, { useState } from "react";
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
  Button
} from "native-base";
import { TouchableOpacity, ScrollView, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Rating } from "react-native-ratings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ingredient from "../components/addIngredients";
import Tag from "../components/addTags";
import { saveToLocal } from "../utils/infoSaver";
import { uniqueId } from "../utils/uniqueId";

export default function({ navigation }) {
  const [form, setForm] = useState({ ingredients: [], tags: [] });
  const [imageUri, setImageUri] = useState(null);

  //refactor ingredients and taggs to one general function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      navigation.navigate("ShowImage", { uri: result.uri, setImageUri })
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const addIngredients = function() {
    setForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ""]
    }));
  };
  const addTags = function() {
    setForm(prev => ({
      ...prev,
      tags: [...prev.tags, ""]
    }));
  };

  let ingredients = [];
  if (form.ingredients.length) {
    ingredients = form.ingredients.map(function(ingredient, index) {
      return (
        <Ingredient
          text={ingredient}
          key={`ingredient ${index}`}
          index={index}
          form={form}
          setForm={setForm}
        />
      );
    });
  }
  let tags = [];
  if (form.tags.length) {
    tags = form.tags.map(function(tag, index) {
      return (
        <Tag
          key={`ingredient ${index}`}
          index={index}
          form={form}
          setForm={setForm}
        />
      );
    });
  }

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll
      extraScrollHeight={10}
      enableOnAndroid={true}
      extraHeight={Platform.select({ android: 100 })}
      enableAutomaticScroll={Platform.OS === "ios"}
      style={{ flex: 1, flexDirection: "column" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <Container>
        <Content>
          <Form>
            <Item floatingLabel style={{ height: 50 }}>
              <Label>Name</Label>
              <Input
                onChangeText={text => {
                  setForm(prev => ({ ...prev, name: text }));
                }}
                value={form.name}
              />
            </Item>
            <Item floatingLabel style={{ height: 50 }}>
              {/* <Label style={{ height: 50 }}>Description</Label> */}
              <Input
                onChangeText={description => {
                  setForm(prev => ({ ...prev, description }));
                }}
                value={form.description}
              />
            </Item>
            <Item>
              <Label style={{ height: 50 }}>Rating</Label>
              <Rating
                imageSize={40}
                fractions={1}
                showRating
                onFinishRating={rating => {
                  setForm(prev => ({ ...prev, rating }));
                }}
              />
            </Item>
            <Text>Ingredients</Text>
            {ingredients}
            <TouchableOpacity
              onPress={() => {
                addIngredients();
              }}
            >
              <Icon name="pluscircleo" type="AntDesign" />
              <Text>Add more</Text>
            </TouchableOpacity>
            <Text>Tags</Text>
            {tags}
            <TouchableOpacity
              onPress={() => {
                addTags();
              }}
            >
              <Icon name="pluscircleo" type="AntDesign" />
              <Text>Add more</Text>
            </TouchableOpacity>
            <Button
              onPress={() => {
                navigation.navigate("Camera", { setImageUri });
              }}
            >
              <Text>Camera</Text>
            </Button>
            <Button onPress={() => pickImage()}>
              <Text>Photo Albumn</Text>
            </Button>

            <Item>
              {console.log("uri in create new", imageUri)}
              <Image
                source={{ uri: imageUri }}
                resizeMode="contain"
                style={{ width: 300, height: 300 }}
              />
            </Item>
          </Form>
          <Button
            onPress={() => {
              console.log("form", form);
              const cardId = uniqueId();
              saveToLocal("cards", { [cardId]: { ...form, cardId } });
              navigation.navigate("Home");
            }}
          >
            <Text>Print form</Text>
          </Button>
        </Content>
      </Container>
    </KeyboardAwareScrollView>
  );
}
