import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function App({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const {setImageUri} = route.params
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  // const onPictureSaved = function () {
  //   navigation.navigate('ShowImage')
  // }
  const options = { quality: 1 };
  const takePicture = async function() {
    const { uri, width, height } = await cameraRef.current.takePictureAsync(
      options
    );
    navigation.navigate("ShowImage", { uri, setImageUri });
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center"
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
              fontSize: 18,
              marginBottom: 10,
              color: "white"
            }}
          >
            CAMERA
          </Text>
          <TouchableOpacity onPress={() => takePicture()}>
            <Text
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
                fontSize: 18,
                marginBottom: 10,
                color: "white"
              }}
            >
              TAKE PICTURE
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
