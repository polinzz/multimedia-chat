import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationScreen from '../screens/ConversationScreen';
import MessageScreen from '../screens/MessageScreen';
import SignInScreen from '../screens/SignInScreen';
import ImagePickerExample from '../screens/ImagePickerExample';
import ParentComponent from '../screens/ParentComponent';
import ParentsScreen from '../screens/ParentsScreen';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Conversations">
        <Stack.Screen
          name="SingIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Conversations" component={ConversationScreen}/>
        <Stack.Screen name="Messages" component={ParentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
