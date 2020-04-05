import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
  const [searchStr, setSearchStr] = useState("");
  return (
    <Form>
      <Item rounded>
        <Icon active type="FontAwesome5" name="search" />
        <TextInput
          onChangeText={text => setSearchStr(prev => text)}
          value={searchStr}
          placeHolder="Search"
          multiline={false}
          autoCapitalize="sentences"
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoFocus={false}
          style={styles.searchBar}
          onSubmitEditing={() => {
            props.onSearch(searchStr);
          }}
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
