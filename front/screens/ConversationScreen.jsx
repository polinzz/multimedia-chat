import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
const ConversationScreen = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'romain lhuissier' },
    { id: 3, name: 'Pauline Miranda' },
    { id: 4, name: 'Anthony Doe' },
    { id: 5, name: 'val Doe' },
  ];

  const toggleUserSelection = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
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
      <View style={styles.view}>
        <Text style={styles.text}>Nouveau groupe</Text>
      </View>
      <View>
        <Text style={styles.text}>Nom de la conversation</Text>
        <TextInput style={styles.input} placeholder="Nom de la conversation..."  required/>
      </View>
      <View>
        <Text style={styles.text}>Contacts</Text>
        <FlatList data={users} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </View>
      <View>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/Frame.png')}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tinyLogo:{
    position: 'absolute',
    right: 0,
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
    fontSize: 18,
    marginBottom: 8,
    fontSize: 20,

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
