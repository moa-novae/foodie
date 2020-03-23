import React from "react";
import { Card, CardItem, Body } from "native-base";
export default function(props) {
  return (
    <Card>
      <CardItem>
        <Body>
          <Text>props.name</Text>
        </Body>
      </CardItem>
    </Card>
  );
}
