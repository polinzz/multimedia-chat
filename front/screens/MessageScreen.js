import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import io from 'socket.io-client';
import config from '../config.json';
import {handleLoginSuccess, makeLoginRequest} from "../api/SignInApi";
import {handleLoginError} from "../utils/ErrorController";
import {check} from "../utils/CheckUserInfo";

export default function ({ route, navigation }) {
  const {conversationId} = route.params;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const socketUrlMyIp = config.socketUrlMyIp;
  const [user, setUser] = useState({});
  const apiUrlMyIp = config.apiUrlMyIp;

  useEffect(() => {
    check().then(result => {
      if(!result) {
        navigation.replace("SingIn");
      }
      setUser(JSON.parse(result));

      fetch(`${apiUrlMyIp}/get-message-by-conv-id/${conversationId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Reponse HTTP : ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error('Erreur :', error);
        });
    });
    const socket = io(socketUrlMyIp);

    socket.emit('joinGroup', conversationId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrlMyIp}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          convId: conversationId,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Reponse HTTP : ${response.status}`);
      }

      return response.json();
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {messages.map((message) => (
        <Text key={message.id}>{message.content}</Text>
      ))}
      <TextInput
        style={styles.input}
        onChangeText={setContent}
        placeholder="Message"
      />
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    padding: 10,
    backgroundColor: "#E5E5E5",
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
  },
  appButtonContainer: {
    backgroundColor: "#F3B852",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop:40,
    width: '100%',
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
