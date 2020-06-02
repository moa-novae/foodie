import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "native-base";
import { theme } from "../styles/theme";
export default function Tag(props) {
  const { tagSelected, setTagSelected, text } = props;
  let selected = tagSelected[text];
  return (
    <Button
      rounded
      onPress={() => {
        setTagSelected((prev) => ({ ...prev, [text]: !selected }));
      }}
      style={[
        styles.tag,
        selected ? styles.tagSelected : styles.tagNotSelected,
      ]}
    >
      <Text
        style={selected ? styles.tagTextSelected : styles.tagTextNotSelected}
      >
        {props.text}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  tag: {
    margin: 5,
  },
  tagSelected: {
    backgroundColor: theme.colors.button,
  },
  tagNotSelected: {
    backgroundColor: theme.colors.tertiary,
  },
  tagTextSelected: {
    color: "#f2f2f2",
  },
  tagTextNotSelected: {
    color: "#1A181B",
  },
});
