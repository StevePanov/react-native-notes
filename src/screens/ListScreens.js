import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { HeaderApp } from "../components";
import { List, Text } from "native-base";
import Swipeout from "react-native-swipeout";

import { queryAllNoteList, deleteNote } from "../../databases/allSchemas";
import realm from "../../databases/allSchemas";

export class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.reloadData();
    realm.addListener("change", () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    queryAllNoteList()
      .then(notes => {
        let notesArr = Array.from(notes);
        this.setState({ notes: notesArr });
      })
      .catch(error => {
        this.setState({ notes: [] });
      });
  };
  render() {
    const { notes } = this.state;
    return (
      <View>
        <HeaderApp
          rightBtn
          rightBtnLabel={"Add"}
          title={"Notes"}
          onPressRight={() =>
            this.props.navigation.navigate("Details", { header: "Add" })
          }
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <List>
              {!!notes ? (
                notes.map(item => (
                  <Swipeout
                    style={{
                      backgroundColor: "white"
                    }}
                    right={[
                      {
                        text: "Delete",
                        backgroundColor: "rgb(217, 80, 64)",
                        onPress: () =>
                          deleteNote(item.id)
                            .then()
                            .catch()
                      }
                    ]}
                    autoClose={true}
                    key={item.id}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("Details", {
                          data: item,
                          header: "Edit"
                        })
                      }
                    >
                      <View>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            margin: 10
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeout>
                ))
              ) : (
                <Text>no notes</Text>
              )}
            </List>
          </View>
        </ScrollView>
      </View>
    );
  }
}
