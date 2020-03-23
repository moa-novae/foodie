import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput
} from "react-native";
import { Form, Item, Input, Icon, DatePicker } from "native-base";
export default function(props) {
  return (
    <Form>
      <Item rounded>
        <Icon active type="FontAwesome5" name="search" />
        <TextInput
          placeHolder="Search"
          multiline={false}
          autoCapitalize="sentences"
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoFocus={true}
          style={styles.searchBar}
        />
      </Item>
    </Form>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    width: "100%"
  }
});
