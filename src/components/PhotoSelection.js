import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Icon, Text } from "native-base";

import * as ImagePicker from "expo-image-picker";

export default function (props) {
  const { navigation, setForm, form } = props;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.cancelled) {
      setForm((prev) => ({ ...prev, uri: result.uri }));
      navigation.navigate("ShowImage", { uri: result.uri, setForm });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Button
          transparent
          style={styles.photoSampleMethod}
          onPress={() => {
            navigation.navigate("Camera", { setForm });
          }}
        >
          <Icon name="camerao" type="AntDesign" />
          <Text>Camera</Text>
        </Button>
        <Button
          transparent
          style={styles.photoSampleMethod}
          // transparent
          onPress={() => pickImage()}
        >
          <Icon name="photo" type="FontAwesome" />
          <Text>Photo Albumn</Text>
        </Button>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {form.uri && (
          <Image
            source={{ uri: form.uri }}
            resizeMode="contain"
            style={{ width: 300, height: 300 }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  photoSampleMethod: {
    width: 150,
    height: 80,
    margin: 10,
    borderColor: "#2164ff",
    borderWidth: 4,
    borderStyle: "dashed",
    justifyContent: "center",
    flexDirection: "column",
  },
});
