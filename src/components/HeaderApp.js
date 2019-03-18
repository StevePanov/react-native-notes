import React, { Component } from "react";
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from "native-base";
import { View } from "react-native"; 

export class HeaderApp extends Component {
  render() {
    const {
      leftBtn,
      rightBtn,
      rightBtnLabel,
      title,
      onPressLeft,
      onPressRight
    } = this.props;
    
    // https://docs.nativebase.io/Components.html#anatomy-headref
    // тут написано что нужно использовать Container из NativeBase, 
    // в который оборачивать другие компоненты данной либы (наверное имеет смысл, хоть и не видно разницы)
    return (
      <View>
        <Header>
          {leftBtn && (
            <Left>
              <Button transparent onPress={() => onPressLeft()}>
                <Icon name="arrow-back" />
                <Text>Back</Text>
              </Button>
            </Left>
          )}
          <Body>
            <Title>{title}</Title>
          </Body>
          {rightBtn && (
            <Right>
              <Button transparent onPress={() => onPressRight()}>
                <Text>{rightBtnLabel}</Text>
              </Button>
            </Right>
          )}
        </Header>
      </View>
    );
  }
}
