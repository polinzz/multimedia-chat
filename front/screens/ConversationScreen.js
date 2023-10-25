import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ({ navigation }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    console.log('hello there');
    fetch('http://192.168.1.184:4499/get-all-conv-by-user/2')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Reponse HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setConversations(data);
      })
      .catch((error) => {
        console.error('Erreur :', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MessageScreen', {
                conversationId: item.id,
              });
            }}
          >
            <Text style={styles.conversationName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conversationName: {
    fontSize: 16,
    marginBottom: 8,
  },
});
