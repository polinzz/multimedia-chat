import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, FlatList, TouchableWithoutFeedback, Image, ScrollView, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { check } from '../utils/CheckUserInfo';

const ConversationScreen = ({ navigation }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversationName, setConversationName] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const getLoggedInUserId = async () => {
      check().then(result => {
        if(!result) {
          navigation.replace("SingIn");
        }
        setLoggedInUser(JSON.parse(result));
      })   
    };

    getLoggedInUserId();

    // Fetch pour récupérer ls user
    fetch('http://172.20.10.2:4499/getUser')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const toggleUserSelection = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSubmit = async () => {
    const dataConv = await createConversation();
    navigation.replace('Messages', {conversationId: dataConv.convId});
  }

  async function createConversation() {
    if (selectedUsers.length > 0 && conversationName && loggedInUser) {
      const response = await fetch('http://172.20.10.2:4499/createConv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: loggedInUser.id,
          selectedUsers,
          conversationName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Reponse HTTP : ${response.status}`);
      }

      return response.json();
    } else {
      console.log('Veuillez sélectionner des utilisateurs et spécifier un nom de conversation.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => toggleUserSelection(item.id)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={[styles.selectionCircle, { backgroundColor: selectedUsers.includes(item.id) ? '#FF9F2D' : 'transparent' }]} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.text}>Nom de la conversation</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom de la conversation..."
            value={conversationName}
            onChangeText={text => setConversationName(text)}
          />
        </View>
        <View>
          <Text style={styles.text}>Contacts</Text>
          <FlatList data={users} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
          <View style={styles.buttonContainer}>
            <Button title="Créer la conversation" onPress={() => handleSubmit()} />
          </View>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/Frame.png')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  tinyLogo: {
    left: 250,
    width: 55,
    height: 55,
    borderRadius: 400,
    position: 'absolute',
  },
  container: {
    flex: 1,
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  itemText: {
    fontSize: 16,
  },
  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF9F2D',
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    borderRadius: 10,
  },
});

export default ConversationScreen;
