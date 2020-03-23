import { Container, Card, CardItem, Body, Content, Text } from 'native-base';
import React from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View } from 'react-native';
import ItemCard from '../components/CardItem'

export default function Category() {
  return (
    <Container>
      <Content>
      <Text>Hello</Text>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
