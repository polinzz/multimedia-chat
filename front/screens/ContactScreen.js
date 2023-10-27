import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, FlatList, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';

const ConversationScreen = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversationName, setConversationName] = useState('');

  useEffect(() => {
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

  const createConversation = () => {
    // Vérifier si au moins un utilisateur est sélectionné et s'il y a un nom de conversation
    if (selectedUsers.length > 0 && conversationName) {
      // Envoyer une requête au backend pour créer la conversation
      fetch('http://votre_adresse_ip:3000/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedUsers,
          conversationName,
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Traitez la réponse du backend si nécessaire
          console.log('Conversation créée avec succès:', data);
        })
        .catch(error => {
          console.error('Erreur lors de la création de la conversation:', error);
        });
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
      <View style={styles.header}>
        <Text style={styles.text}>Nouveau groupe</Text>
      </View>
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
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/Frame.png')}
        />
      </View>
      
      {/* <Button title="Créer la conversation" onPress={createConversation} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header:{
    marginBottom: 0,
    padding: 15,
  },
scrollView: {
  marginHorizontal: 20,
},
imageContainer: {
  marginTop: 20,
},
tinyLogo:{
    left: 250,
    width: 55, 
    height: 55,
    borderRadius: 400,
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
  view: {
    marginBottom: 16,
    padding: 15,
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
