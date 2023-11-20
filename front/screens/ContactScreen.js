import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { check } from '../utils/CheckUserInfo';
import config from '../config.json';
import {colors} from "../assets/style/StylesGlobal";

const ConversationScreen = ({ navigation }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversationName, setConversationName] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const apiUrlMyIp = config.apiUrlMyIp;

  useEffect(() => {
    check().then(result => {
      if (!result) {
        navigation.replace("SingIn");
      }
      setLoggedInUser(JSON.parse(result));
    })


      fetch(`${apiUrlMyIp}/getUser`)
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
      const response = await fetch(`${apiUrlMyIp}/createConv`, {
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
      {item.name !== loggedInUser &&
        <View style={styles.item}>
          <View style={[styles.selectionCircle, { backgroundColor: selectedUsers.includes(item.id) ? '#FF9F2D' : 'transparent' }]} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      }
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conversationName}>
        <Text style={styles.text}>Nom de la conversation</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom de la conversation..."
          value={conversationName}
          onChangeText={(text) => setConversationName(text)}
          placeholderTextColor={colors.greyLight}
        />
      </View>
      <View>
        <Text style={styles.text}>Contacts</Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleUserSelection(item.id)}>
            {item.id !== loggedInUser.id && (
              <View style={styles.item}>
                <View style={[styles.selectionCircle, { backgroundColor: selectedUsers.includes(item.id) ? '#FF9F2D' : 'transparent' }]} />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      {/*<View style={styles.buttonContainer}>
        <Button title="Créer la conversation" onPress={() => handleSubmit()} />
      </View>*/}
      <TouchableOpacity style={styles.touchable} onPress={() => handleSubmit()}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/images/Frame.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  conversationName: {
    marginBottom: 20,
    marginTop: 16,
  },
  touchable: {
    bottom: 24,
  },
  tinyLogo: {
    width: 65,
    height: 65,
    borderRadius: 400,
    left: '100%',
    transform: [{ translateX: -80 }],
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
    gap: 12,
  },
  itemText: {
    fontSize: 16,
  },
  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  input: {
    // height: 40,
    borderWidth: 0.5,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: colors.greyDark
  },
});

export default ConversationScreen;
