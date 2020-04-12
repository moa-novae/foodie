import React from "react";
import { Item, Input, Text, Icon, Button } from "native-base";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { uniqueId } from "../utils/uniqueId";

const SingleField = function (props) {
  const { placeholder, value, setForm, formKey } = props;
  return (
    <Item regular style={styles.singleField}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          setForm((prev) => {
            let output = { ...prev };
            output[formKey][id] = text;
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
    setForm((prev) => {
      const output = { ...prev };
      output[formKey][uniqueId()] = "";
      return output;
    });
  };
  let fieldCollection = [];
  if (Object.keys(form[formKey]).length) {
    fieldCollection = Object.entries(form[formKey]).map(function ([id, value]) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <SingleField
            value={value}
            key={id}
            id={id}
            form={form}
            setForm={setForm}
            placeholder={placeholder}
            formKey={formKey}
          />
          <Icon
            name="delete"
            type="AntDesign"
            style={{ fontSize: 30 }}
            onPress={() => {
              setForm((prev) => {
                const newForm = { ...prev };
                delete newForm[formKey][id];
                return newForm;
              });
            }}
          />
        </View>
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
  addFieldButtonContainer: { flex: 1, alignItems: "flex-end", marginRight: 39 },
  singleField: { marginVertical: 3, width: 330, backgroundColor: '#f0f0f0' },
  fieldsTitle: { fontSize: 18, marginVertical: 7 },
});
