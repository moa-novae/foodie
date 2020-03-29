import React from 'react'
import {Item, Input} from 'native-base'

export default function Ingredient(props) {
  return (
    <Item>
      <Input
        placeholder="ingredient"
        defaultValue={props.form.ingredients[props.index]}
        onChangeText={ingredient =>
          props.setForm(prev => {
            let output = { ...prev };
            output.ingredients[props.index] = ingredient;
            return output;
          })
        }
      />
    </Item>
  );
}