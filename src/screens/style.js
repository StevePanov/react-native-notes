import { StyleSheet } from "react-native";

export default StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  input: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },

  swipe: {
    backgroundColor: "rgb(255, 255, 255)",
    borderBottomColor: "rgb(200, 200, 200)",
    borderBottomWidth: 1
  },

  title: {
    fontSize: 18,
    margin: 14
  }
});
