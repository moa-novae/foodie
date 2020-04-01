import React, { useState } from "react";
import { Container, Content, Text } from "native-base";
import { ImageBackground, View, Dimensions } from "react-native";
import { ImageManipulator } from "expo-image-crop";

export default function({ route, navigation }) {
  const { uri } = route.params;
  const [editorVisible, setEditorVisible] = useState(true);
  return (
    <Container>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            flex: 6,
            justifyContent: "center",
            padding: 20,
            alignItems: "center",
            backgroundColor: "black"
          }}
          resizeMode="contain"
          source={{ uri }}
        />
        <View style={{ flex: 1 }}>
          <ImageManipulator
            isVisible={editorVisible}
            photo={{ uri }}
            ratio={{width: 1, height: 1}}
            onToggleModal={() => {
              setEditorVisible(prev => !prev);
              navigation.pop(2)
            }}
          />
        </View>
      </View>
    </Container>
  );
}
