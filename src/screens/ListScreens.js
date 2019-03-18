import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { HeaderApp } from "../components"; // все импорты с абсолютными путями лучше писать ниже, чем испорты из node_modules
import { List, Text } from "native-base";
import Swipeout from "react-native-swipeout";

import { queryAllNoteList, deleteNote } from "../../databases/allSchemas";
import realm from "../../databases/allSchemas";

// Классы / компоненты и название файлов лучше делать одинаковыми, 
// и вообще не понятно почему в названии файла - множественное число ListScreenS ?
export class ListScreen extends React.Component {
  // от конструктора можно избавиться как и в DetailsScreens, 
  // только часть бизнес логики отсюда можно вынести в componentWillMount или componentDidMiount
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
    /* можно через async / await заменить код на
       reloadData = async () => {
         try {
          const notes = await queryAllNoteList()
          let notesArr = Array.from(notes);
          this.setState({ notes: notesArr });
         } 
         catch (error) {
           this.setState({ notes: [] });
         }
      };
    */
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
          rightBtnLabel={"Add"} // когда присваиваем строковые значение - не нужно писать фигурные скобки
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
              {notes.length > 0 ? (
                notes.map(item => (
                  <Swipeout
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      borderBottomColor: "rgb(200, 200, 200)",
                      borderBottomWidth: 1
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
                            fontSize: 18,
                            margin: 14
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
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
          </View>
        </ScrollView>
      </View>
    );
  }
}
