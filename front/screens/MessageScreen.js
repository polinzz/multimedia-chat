import React from 'react';
import { View, Text } from 'react-native';
import NewMessage from '../components/NewMessage.js';
export default function ({ route }) {
	const { conversationId } = route.params;
	return (
		<View>
			<Text>Conversation ID: {conversationId}</Text>
			<NewMessage />
		</View>
	);
};