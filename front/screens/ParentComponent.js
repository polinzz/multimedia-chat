import React, { useState } from 'react';
import { Button, Image, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

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

  const sendToServer = async () => {
    const formData = new FormData();
    
    if (image) {
      const { uri, type, name } = image;
      formData.append('file', { uri, type, name });
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
        const data = await response.text();
        if (data) {
          console.log('Réponse du serveur:', JSON.parse(data));
        } else {
          console.log('La réponse du serveur est vide');
        }
      } else {
        console.error('Erreur lors de l\'envoi des données au serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la requête fetch:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from media library" onPress={pickImage} />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, width: '80%' }}
        placeholder="Enter text here"
        onChangeText={setText}
        value={text}
      />
      <Button title="Send to server" onPress={sendToServer} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
