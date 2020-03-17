import React from 'react';
import { StyleSheet } from "react-native";
import {Button, Text} from 'native-base'

export default function Tag (props) {
  return(

    <Button style={styles.tag} rounded light>
      <Text>
        {props.text}
      </Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  tag: {
    margin: 5
  }
})
