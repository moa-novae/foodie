import React from "react";
import {View, Text, Button} from 'react-native'

export default function HalfModal({ navigation }) {
  return (
    <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'}}>
      <View style={{ height: "50%" ,width: '100%', backgroundColor:"#fff", justifyContent:"center"}}>

      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    </View>
  );
}