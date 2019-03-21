import React from "react";
import { Form, Label } from "native-base";
import { ScrollView, TextInput } from "react-native";

import HeaderApp from "../components/HeaderApp";
import { updateNote, insertNewNote } from "../../databases/allSchemas";
import styles from "./style";

export default class DetailsScreen extends React.Component {
  state = { id: "", title: "", description: "", date: new Date() };

  setTitle = value => {
    this.setState({ title: value });
  };

  setDescription = value => {
    this.setState({ description: value });
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
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <HeaderApp
          leftBtn
          rightBtn
          rightBtnLabel="Save"
          title={navigation.state.params.header}
          onPressLeft={() => navigation.goBack()}
          onPressRight={
            !!title && !!description
              ? () => this.saveNote(id, title, description, date)
              : () => alert("Fill in all fields!")
          }
        />
        <ScrollView contentContainerStyle={styles.content}>
          <Form style={{ padding: 10 }}>
            <Label>Title:</Label>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setTitle(text)}
              value={title}
              placeholder="Write title"
            />

            <Label>Description:</Label>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={7}
              onChangeText={text => this.setDescription(text)}
              placeholder="Write description"
              value={description}
            />

            {navigation.state.params.header === "Edit" && (
              <React.Fragment>
                <Label>Date:</Label>
                <TextInput
                  style={styles.input}
                  value={date.toString().substr(4, 12)}
                />
              </React.Fragment>
            )}
          </Form>
        </ScrollView>
      </React.Fragment>
    );
  }
}
