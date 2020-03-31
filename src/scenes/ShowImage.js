import React from "react";
import { Container, Content, Text } from "native-base";
import { Image } from "react-native";

export default function({ route }) {
  const { uri } = route.params;
  return (
    <Container>
      <Content style={{ flex: 1 }}>
        <Image style={{ width: 400, height: 400 }} source={{ uri }} />
        {console.log("uri", uri)}
      </Content>
    </Container>
  );
}
