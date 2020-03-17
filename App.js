import React, { Component, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Font  from "expo-font";
import HomeNav from "./src/navigations/homeStack";

export default class Login extends Component {
  state = {
    isReady: false
  };

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
    return <HomeNav />;
  }
}
