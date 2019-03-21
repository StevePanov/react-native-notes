import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import DetailsScreen from "./src/screens/DetailsScreen";
import ListScreen from "./src/screens/ListScreen";

const RootStack = createStackNavigator(
  {
    List: ListScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "List",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
