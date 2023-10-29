import React, { useState, useEffect } from 'react';
import { Button, Image, TextInput, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ParentsScreen() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const sendToServer = async () => {
    const formData = new FormData();

    if (image) {
      const { uri, type, name } = image.assets[0];
      formData.append("file", image.assets[0], "mesh-gradient.png");

    }

    if (text) {
      formData.append('text', text);
    }

    try {
      const response = await fetch('http://192.168.43.21:4499/send-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Réponse du serveur:', data);
      } else {
        console.error('Erreur lors de l\'envoi des données au serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la requête fetch:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Choisissez une image</Text>
      <Button title="Pick an image from media library" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image.assets[0].uri }} style={{ width: 200, height: 200 }} />}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, width: '80%' }}
        placeholder="Enter text here"
        onChangeText={setText}
        value={text}
      />
      <Button title="Send to server" onPress={sendToServer} />
    </View>
  );
}
