import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "native-base";

export default function Tag(props) {
  const { tagSelected, setTagSelected, text } = props;
  let selected = tagSelected[text];
  return (
    <Button
      rounded
      onPress={() => {
        setTagSelected(prev => ({ ...prev, [text]: !selected }));
      }}
      style={[
        styles.tag,
        selected ? styles.tagSelected : styles.tagNotSelected
      ]}
    >
      <Text>{props.text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  tag: {
    margin: 5
  },
  tagSelected: {
    backgroundColor: "#1f2232"
  },
  tagNotSelected: {
    backgroundColor: "#d5d9d2"
  }
});
