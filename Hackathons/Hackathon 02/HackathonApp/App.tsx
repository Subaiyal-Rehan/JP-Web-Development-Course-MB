/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Toast from 'react-native-toast-message';
import useSRStyles from './Styles/SRStyles';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Browse from './Screens/Browse';
import SingleFood from './Screens/SingleFood';
import Cart from './Screens/Cart';
import Account from './Screens/Account';
import Orders from './Screens/Orders';

const Stack = createNativeStackNavigator();
function App() {
  const SRStyles = useSRStyles();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: SRStyles.headerStyle,
            headerTitleAlign: 'center',
            headerTintColor: SRStyles.headerTextColor.color,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurants" component={Browse} />
          <Stack.Screen name="Single Food" component={SingleFood} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
