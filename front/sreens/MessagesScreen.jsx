import React from "react";
import { useRef, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Message from '../components/Message';
import { colors } from "../assets/style/StylesGlobal";

export default function MessagesScreen() {
    const scrollViewRef = useRef()

  const messagesBase = [
    {
      id: 1,
      sender: 1,
      content: "Bonjour c'est Elon"
    },
  ]

  const [messages, setMessages] = useState(messagesBase)
  const [inputValue, setInputValue] = useState("")

  const sendMessage = () => {
    setMessages(
      [...messages, 
        {
          id: messages.length + 1, 
          sender: 2, 
          content: inputValue
        }
      ]
    )
    setInputValue("")
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollMessages} ref={scrollViewRef}>
        <View style={styles.messages}>
          {messages.map((message) => {
            return <Message message={message} key={message.id} />;
          })}
        </View>
      </ScrollView>
      <View style={styles.form}>
        <TextInput
          value={inputValue}
          multiline={true}
          placeholder="Message..."
          onChangeText={(text) => setInputValue(text)}
          style={styles.input}
          placeholderTextColor="#979797"
        />
        {
            inputValue.length > 0 
            ? (
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => sendMessage()}
                    >
                    <Text style={styles.sendButtonText}>Envoyer</Text>
                </TouchableOpacity>
            )
            : (
                <Image style={styles.multimediaImage} source={require('../assets/images/image-input-message.png')} />
            )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 10,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: 22,
    marginTop: 40,
    color: colors.grey,
    fontSize: 22,
    fontWeight: "bold",
  },
  scrollMessages: {
    flex: 1,
  },
  messages: {
    gap: 12,
    paddingBottom: 2,
  },
  form: {
    flex: 0,
    flexDirection: "row",
    borderRadius: 90,
    borderWidth: 1,
    alignItems: "center",
    //borderColor: "#737373",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    //color: "#F0F0F0",
  },
  multimediaImage: {
    width: 24,
    height: 24,
  },
  sendButton: {},
  sendButtonText: {
    //color: "#1364F4",
    fontWeight: "bold",
    fontSize: 16,
  },
});
