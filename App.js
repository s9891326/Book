import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screen/HomeScreen';
import DetailsScreen from './screen/DetailScreen'
import AddEditBookScreen from './screen/AddEditBookScreen'


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Detail: DetailsScreen,
    AddEditBook: AddEditBookScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FFC35F',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      },
    },
  }
);


export default createAppContainer(RootStack);