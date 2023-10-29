import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importer depuis Expo ImagePicker
import io from 'socket.io-client';
import config from '../config.json';
import { handleLoginSuccess, makeLoginRequest } from '../api/SignInApi';
import { handleLoginError } from '../utils/ErrorController';
import { check } from '../utils/CheckUserInfo';
import { timeNormalize } from '../utils/timeHandler';

export default function ({ route, navigation }) {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState({});
  const socketUrlMyIp = config.socketUrlMyIp;
  const [user, setUser] = useState({});
  const apiUrlMyIp = config.apiUrlMyIp;
  const scrollViewRef = useRef();

  useEffect(() => {
    check().then((result) => {
      if (!result) {
        navigation.replace('SingIn');
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

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('La permission d\'accéder à la bibliothèque de médias est requise.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('convId', conversationId);
      formData.append('userId', user.id);
      formData.append('author', user.name);

      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }

      const response = await fetch(`${apiUrlMyIp}/send-message`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Reponse HTTP : ${response.status}`);
      }

      setContent('');
      setSelectedImage(null);

      return response.json();
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item: message }) => (
          <View
            style={
              message.author === user.name
                ? styles.userMessageContainer
                : styles.otherMessageContainer
            }
          >
            {message.author !== user.name && (
              <Text style={styles.authorName}>{message.author}</Text>
            )}
            <Text
              style={
                message.author === user.name
                  ? styles.userMessage
                  : styles.otherMessage
              }
            >
              {message.content}
            </Text>
            <Text
              style={
                message.author === user.name
                  ? styles.userDate
                  : styles.otherDate
              }
            >
              {timeNormalize(message.updatedAt, 'message')}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ref={(ref) => (flatListRef = ref)}
        onContentSizeChange={() => flatListRef.scrollToEnd({ animated: true })}
      />

      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Message"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity onPress={selectImage} style={styles.selectImageButton}>
          <Text style={styles.selectImageButtonText}>Sélectionner une image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  authorName: {
    color: 'gray',
    marginRight: 5,
  },
  userMessage: {
    backgroundColor: '#F3B852',
    padding: 10,
    borderRadius: 8,
    maxWidth: '70%',
  },
  otherMessage: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    borderRadius: 8,
    maxWidth: '70%',
  },
  userDate: {
    color: 'gray',
    marginRight: 5,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  otherDate: {
    color: 'gray',
    marginRight: 5,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectImageButton: {
    backgroundColor: '#F3B852',
    borderRadius: 25,
    padding: 10,
  },
  selectImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#F3B852',
    borderRadius: 25,
    padding: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
