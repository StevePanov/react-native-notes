import React, { Component } from "react";
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  View
} from "native-base";

export default class HeaderApp extends Component {
  render() {
    const {
      leftBtn,
      rightBtn,
      rightBtnLabel,
      title,
      onPressLeft,
      onPressRight
    } = this.props;

    //использую View тк при Container основной контент ровняется по центру
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
