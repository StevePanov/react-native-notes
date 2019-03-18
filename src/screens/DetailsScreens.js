import React from "react";
import { Form, Input, Label, Textarea, DatePicker } from "native-base";
import { ScrollView, View, Text } from "react-native";

import { HeaderApp } from "../components";
import { updateNote, insertNewNote } from "../../databases/allSchemas";

export class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", title: "", description: "", date: new Date() };
  }
  setTitle = value => {
    this.setState({ title: value });
  };
  setDescription = value => {
    this.setState({ description: value });
  };
  setDate = value => {
    this.setState({ date: value });
  };
  saveNote = (id, title, description, date) => {
    this.setState({ id, title, description, date });
    if (!!id) {
      const editNoteList = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        date: this.state.date
      };
      updateNote(editNoteList)
        .then()
        .catch(error => {
          alert(`Edit noteList error ${error}`);
        });
    } else {
      const newNoteList = {
        id: Math.floor(Date.now() / 1000),
        title: this.state.title,
        description: this.state.description,
        date: this.state.date
      };
      insertNewNote(newNoteList)
        .then()
        .catch(error => {
          alert(`Insert new noteList error ${error}`);
        });
    }
    this.props.navigation.goBack();
  };
  componentDidMount() {
    if (this.props.navigation.state.params.data) {
      const {
        id,
        title,
        description,
        date
      } = this.props.navigation.state.params.data;
      this.setState({ id, title, description, date });
    }
  }
  render() {
    const { id, title, description, date } = this.state;
    return (
      <View>
        <HeaderApp
          leftBtn
          rightBtn
          rightBtnLabel={"Save"}
          title={this.props.navigation.state.params.header}
          onPressLeft={() => this.props.navigation.goBack()}
          onPressRight={
            !!title && !!description && !!date
              ? () => this.saveNote(id, title, description, date)
              : () => alert("Fill in all fields!")
          }
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: 10
            }}
          >
            <Form>
              <Label>Title:</Label>
              <Input
                placeholder="Write title"
                value={title}
                onChangeText={this.setTitle}
              />

              <Label>Description:</Label>
              <Textarea
                rowSpan={5}
                placeholder="Write description"
                value={description}
                onChangeText={this.setDescription}
              />

              <DatePicker
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                textStyle={{ color: "black" }}
                onDateChange={this.setDate}
                disabled={false}
              />
              <Text>{date.toString().substr(4, 12)}</Text>
            </Form>
          </View>
        </ScrollView>
      </View>
    );
  }
}
