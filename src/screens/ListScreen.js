import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { List, Text } from "native-base";
import Swipeout from "react-native-swipeout";

import HeaderApp from "../components/HeaderApp";
import { queryAllNoteList, deleteNote } from "../../databases/allSchemas";
import realm from "../../databases/allSchemas";
import styles from "./style";

export default class ListScreen extends React.Component {
  state = { notes: [] };

  reloadData = async () => {
    try {
      const notes = await queryAllNoteList();
      let notesArr = Array.from(notes);
      this.setState({ notes: notesArr });
    } catch (error) {
      this.setState({ notes: [] });
    }
  };

  componentDidMount() {
    this.reloadData();
    realm.addListener("change", () => {
      this.reloadData();
    });
  }

  render() {
    const { notes } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <React.Fragment>
        <HeaderApp
          rightBtn
          rightBtnLabel="Add"
          title="Notes"
          onPressRight={() => navigate("Details", { header: "Add" })}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <List>
            {notes.length > 0 ? (
              notes.map(item => (
                <Swipeout
                  style={styles.swipe}
                  right={[
                    {
                      text: "Delete",
                      backgroundColor: "rgb(217, 80, 64)",
                      onPress: () => deleteNote(item.id)
                    }
                  ]}
                  autoClose={true}
                  key={item.id}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigate("Details", {
                        data: item,
                        header: "Edit"
                      })
                    }
                  >
                    <React.Fragment>
                      <Text style={styles.title}>{item.title}</Text>
                    </React.Fragment>
                  </TouchableOpacity>
                </Swipeout>
              ))
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 20
                }}
              >
                No notes
              </Text>
            )}
          </List>
        </ScrollView>
      </React.Fragment>
    );
  }
}
