import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../sreens/MessagesScreen';
import HomeScreen from '../sreens/HomeScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen'>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


