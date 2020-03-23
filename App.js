import React, { Component, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Font from "expo-font";
import RootNav from "./src/navigations/RootStack";

export default class Login extends Component {
  state = {
    isReady: false
  };
  //Making sure custom fonts load first, preventing error
  componentDidMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator />;
    }
    return <RootNav />;
  }
}
