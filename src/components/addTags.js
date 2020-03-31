import React from "react";
import { Item, Input } from "native-base";
export default function Tag(props) {
  return (
    <Item>
      <Input
        placeholder="tag"
        defaultValue={props.form.tags[props.index]}
        onChangeText={tag =>
          props.setForm(prev => {
            const output = { ...prev };
            output.tags[props.index] = tag;
            return output;
          })
        }
      />
    </Item>
  );
}
