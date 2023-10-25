import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationScreen from '../screens/ConversationScreen';
import MessageScreen from '../screens/MessageScreen';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Conversations">
        <Stack.Screen name="Conversations" component={ConversationScreen} />
        <Stack.Screen name="Messages" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
