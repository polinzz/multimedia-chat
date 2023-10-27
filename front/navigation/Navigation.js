import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationScreen from '../screens/ConversationScreen';
import MessageScreen from '../screens/MessageScreen';
import SignInScreen from '../screens/SignInScreen';
import ContactScreen from '../screens/ContactScreen';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Conversations">
=======
      <Stack.Navigator initialRouteName="Nouvelle conversation">
>>>>>>> 43f3826 (allah u ak bar)
        <Stack.Screen
          name="SingIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
<<<<<<< HEAD
        <Stack.Screen name="Conversations" component={ConversationScreen}/>
        <Stack.Screen name="Contacts" component={ContactScreen} />
=======
        <Stack.Screen name="Nouvelle conversation" component={ContactScreen} />
        <Stack.Screen name="Conversations" component={ConversationScreen} />
>>>>>>> 43f3826 (allah u ak bar)
        <Stack.Screen name="Messages" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
