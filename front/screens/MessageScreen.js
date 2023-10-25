import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';
import config from '../config.json';

const ConversationScreen = ({ route }) => {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const socketUrlMyIp = config.socketUrlMyIp;

  useEffect(() => {
    const socket = io(socketUrlMyIp);

    socket.emit('joinGroup', conversationId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  return (
    <View>
      <Text>Conversation ID: {conversationId}</Text>
      {messages.map((message) => (
        <Text key={message.id}>{message.content}</Text>
      ))}
    </View>
  );
};

export default ConversationScreen;
