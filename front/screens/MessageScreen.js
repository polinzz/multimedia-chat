import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import io from 'socket.io-client';
import config from '../config.json';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {check} from "../utils/CheckUserInfo";
import {timeNormalize} from '../utils/timeHandler';
import {colors} from "../assets/style/StylesGlobal";

export default function ({ route, navigation }) {
  const {conversationId} = route.params;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const socketUrlMyIp = config.socketUrlMyIp;
  const [user, setUser] = useState({});
  const apiUrlMyIp = config.apiUrlMyIp;
  const imgDir = FileSystem.documentDirectory + 'images/';
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  const selectImage = async () => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.75
    };

    result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      await saveImage(result.assets[0].uri)
    }
  };

  const saveImage = async (uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + '.jpeg';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setSelectedImage({uri: uri, filename: nameNormalize(uri)});
    setImages([...images, dest]);
  };

  const nameNormalize = (uri) => {
    const parts = uri.split('/');
    return parts[parts.length - 1]
  }

  const uploadImage = async (uri) => {
    setUploading(true);

    await FileSystem.uploadAsync(`${apiUrlMyIp}/upload`, uri, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',
    });

    setUploading(false);
  };

  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

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
          author: user.name,
          link: selectedImage.filename ?? ''
        }),
      });


      if (selectedImage.uri) {
        await uploadImage(selectedImage.uri);
      }

      if (!response.ok) {
        throw new Error(`Reponse HTTP : ${response.status}`);
      }

      setContent("");
      if (selectedImage.uri) {
        await deleteImage(selectedImage.uri);
        setSelectedImage({});
      }

      return response.json();
    } catch (error) {
      throw new Error(`error : ${error}`);
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
            {message.link && (
              <Image
                source={{ uri: `${apiUrlMyIp}/uploads/${message.link}` }}
                style={styles.selectedImage}
              />
            )}
            {message.content && (
              <Text
                style={
                  message.author === user.name
                    ? styles.userMessage
                    : styles.otherMessage
                }
              >
                {message.content}
              </Text>
            )}
            <Text
              style={
                message.author === user.name
                  ? styles.userDate
                  : styles.otherDate
              }
            >
              {timeNormalize(message.updatedAt, "message")}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ref={(ref) => (flatListRef = ref)}
        onContentSizeChange={() => flatListRef.scrollToEnd({ animated: true })}
      />

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.selectedImage}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Message..."
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity onPress={selectImage} style={styles.logoContainer}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/images/image-send.png")}
          />
        </TouchableOpacity>
        {(content.length > 0 || selectedImage.uri) && (
          <TouchableOpacity onPress={() => handleSubmit()}>
            <Text>Envoyer</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: colors.background,
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
    maxWidth: '70%',
    backgroundColor: colors.orangeLight,
    borderColor: colors.orangeLight,
    color: colors.grey,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 12,
  },
  otherMessage: {
    maxWidth: '70%',
    borderColor: colors.orangeLight,
    color: colors.grey,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 4,
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
    padding: 10,
    borderRadius: 90,
    marginVertical: 10,
    borderColor: colors.greyDark,
    borderWidth: 0.5,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  selectImageButton: {
    padding: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
  tinyLogo: {
    width: 29,
    height: 29,
  },
  logoContainer: {
    paddingRight: 8,
  }
});


