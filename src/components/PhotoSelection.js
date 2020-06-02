import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Icon, Text } from "native-base";
import {theme} from '../styles/theme'
import * as ImagePicker from "expo-image-picker";

export default function (props) {
  const { navigation, setForm, form } = props;
  const PictureUri = form.uri ? (
    <Image
      source={{ uri: form.uri }}
      resizeMode="cover"
      style={{ width: 250, height: 250 }}
    />
  ) : (
    <Image
      source={require("../assets/no_image.png")}
      resizeMode='cover'
      style={{ width: 250, height: 250 }}
    />
  );
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
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View style={{margin: 10}}>{PictureUri}</View>
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "column",
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
            <Icon name="addfile" type="AntDesign" />
            <Text>Photo Albumn</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  photoSampleMethod: {
    width: 100,
    height: 115,
    margin: 10,
    borderColor: theme.colors.primary,
    borderWidth: 4,
    borderStyle: "dashed",
    justifyContent: "center",
    flexDirection: "column",
  },
});
