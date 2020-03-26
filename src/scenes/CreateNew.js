import React, { useState } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Label,
  Form,
  Input,
  Button
} from "native-base";
import { Rating } from "react-native-ratings";

function Ingredient(props) {
  return (
    <Item>
      <Input placeholder="ingredient" text={props.ingredient} />
    </Item>
  );
}

export default function() {
  const [form, setForm] = useState({ ingredients: [] });

  const addIngredients = function() {
    setForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };
  let ingredients = [];
  if (form.ingredients.length) {
     ingredients = form.ingredients.map(ingredient => (
      <Ingredient text={ingredient} />
    ));
  }

  return (
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
            <Label style={{ height: 50 }}>Description</Label>
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
          <Button onPress={() => addIngredients()}>
            <Text>New Ingredient</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
