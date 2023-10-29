import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    Button,
} from 'react-native';
import io from 'socket.io-client';
import config from '../config.json';
import { handleLoginError } from '../utils/ErrorController';
import { check } from '../utils/CheckUserInfo';
import * as ImagePicker from 'react-native-image-picker';

export default function ({ route, navigation }) {
    const { conversationId } = route.params;
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({});
    const socketUrlMyIp = config.socketUrlMyIp;
    const apiUrlMyIp = config.apiUrlMyIp;

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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    // const handleSubmit = async () => {
    //     try {
    //         const requestData = {
    //             content,
    //             convId: conversationId,
    //             userId: user.id,
    //             author: user.name,
    //         };

    //         if (selectedImage) {
    //             requestData.file = {
    //                 uri: Platform.OS === 'android' ? `file://${selectedImage.uri}` : selectedImage.uri,
    //                 type: selectedImage.type,
    //                 name: selectedImage.fileName || selectedImage.uri.split('/').pop(),
    //             };
    //         }

    //         const response = await fetch(`${apiUrlMyIp}/send-message`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(requestData),
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Reponse HTTP : ${response.status}`);
    //         }

    //         setSelectedImage(null);

    //         return response.json();
    //     } catch (error) {
    //         handleLoginError(error);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {messages.map((message) => (
                <React.Fragment key={message.id}>
                    {message.content && <Text>{message.content}</Text>}
                    {/* <Text>{message.link}</Text>
                    {message.image && (
                        <Image
                            source={{ uri: `${apiUrlMyIp}/${message.link}` }}
                            style={styles.image}
                        />
                    )} */}
                </React.Fragment>
            ))}
            <TextInput
                style={styles.input}
                onChangeText={setContent}
                placeholder="Message"
            />
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {/* <TouchableOpacity
                onPress={handleSubmit}
                style={styles.appButtonContainer}
            >
                <Text style={styles.appButtonText}>Envoyer</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        padding: 10,
        backgroundColor: '#E5E5E5',
        width: '100%',
        borderRadius: 8,
        marginBottom: 20,
    },
    appButtonContainer: {
        backgroundColor: '#F3B852',
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 40,
        width: '100%',
    },
    appButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
});