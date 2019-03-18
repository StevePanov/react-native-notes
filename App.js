import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { DetailsScreen, ListScreen } from './src/screens'

const RootStack = createStackNavigator(
  {
    List: ListScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'List',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
