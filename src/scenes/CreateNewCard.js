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
import { saveToLocal } from "../utils/infoSaver";
import { uniqueId } from "../utils/uniqueId";

export default function ({ navigation }) {
  const [form, setForm] = useState({
    ingredients: [],
    tags: [],
    rating: 2.5,
  });

  //refactor ingredients and taggs to one general function

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const addTags = function () {
    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  let tags = [];
  if (form.tags.length) {
    tags = form.tags.map(function (tag, index) {
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
            <Item regular style={{ marginVertical: 10 }}>
              <Input
                onChangeText={(text) => {
                  setForm((prev) => ({ ...prev, name: text }));
                }}
                value={form.name}
                placeholder="Name"
              />
            </Item>
            <Item regular style={{ marginVertical: 10, minHeight: 50 }}>
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
        </KeyboardAwareScrollView>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  textField: {
    marginVertical: 10,
  },
});
