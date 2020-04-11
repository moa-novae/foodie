import React from "react";
import { Item, Input, Text, Icon, Button } from "native-base";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const SingleField = function (props) {
  const { placeholder, value, setForm, formKey, index } = props;
  return (
    <Item regular style={styles.singleField}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          setForm((prev) => {
            let output = { ...prev };
            output[formKey][index] = text;
            return output;
          });
        }}
      />
    </Item>
  );
};

export default function MultiField(props) {
  const { formKey, form, placeholder, setForm, title } = props;
  const addField = function () {
    setForm((prev) => ({
      ...prev,
      [formKey]: [...prev[formKey], ""],
    }));
  };
  let fieldCollection = [];
  if (form[formKey].length) {
    fieldCollection = form[formKey].map(function (input, index) {
      return (
        <SingleField
          value={input}
          key={`${placeholder} ${index}`}
          index={index}
          form={form}
          setForm={setForm}
          placeholder={placeholder}
          formKey={formKey}
        />
      );
    });
  }
  return (
    <View>
      <Text style={styles.fieldsTitle}>{title}</Text>
      {fieldCollection}
      <View style={styles.addFieldButtonContainer}>
        <Button
          iconLeft
          bordered
          rounded
          style={styles.addFieldButton}
          onPress={() => {
            addField();
          }}
        >
          <Icon name="pluscircleo" type="AntDesign" />
          <Text>Add More</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addFieldButton: { width: 150, marginVertical: 7 },
  addFieldButtonContainer: { flex: 1, alignItems: "flex-end" },
  singleField: { marginVertical: 3, width: 330 },
  fieldsTitle: {fontSize: 18, marginVertical: 7}
});
