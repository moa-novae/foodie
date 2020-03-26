import React from "react";
import { Container, Content, Text, Item, Label, Form } from "native-base";
export default function() {
  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel style={{ height: 50 }}>
            <Label>Name</Label>
          </Item>
          <Item floatingLabel style={{ height: 50 }} last>
            <Label style={{ height: 50 }}>Description</Label>
          </Item>
        </Form>
      </Content>
    </Container>
  );
}
