import React from 'react';
import { View, Text } from 'react-native';

export default function ({ route }) {
  const { conversationId } = route.params;

  return (
    <View>
      <Text>Conversation ID: {conversationId}</Text>
    </View>
  );
};
